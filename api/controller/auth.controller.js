const { getUserByEmail, addUser } = require("../models/auth.model");
const { comparePassWord, generateToken } = require("../utils/customLogis");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = async (req, res, next) => {
  let { name, email, password, pic } = req.body;

  //   console.log(name, email, password, req.body);
  //   console.log(req.files, req.pic, req.file);
  if (!name || !email || !password) {
    return next("Please Enter all the Feilds");
  }
  if (typeof password !== "string") {
    return next("Password need to be string");
  }

  try {
    const userExists = await getUserByEmail(req, email);

    if (userExists) {
      return next("User already exists");
    }

    const user = await addUser(req);

    if (user) {
      return res.json({
        success: true,
        message: "User added successfully",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const testAuth = async (req, res) => {
  //   res.send("api is working");
  const { id } = req.params;
  const result = await req.app
    .get("db")
    .query(`DELETE FROM "user" WHERE id = $1`, [id]);
  try {
    const result = await req.app.get("db").query('SELECT * FROM "user"');

    // console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    res.send(err.message);
  }
};

const signIn = async (req, res, next) => {
  const { email, password: userPassword } = req.body;

  if (!email || !userPassword) {
    return next("Please Enter all the Feilds");
  }

  try {
    const user = await getUserByEmail(req, email);

    if (user && (await comparePassWord(userPassword, user[0].password))) {
      let { password, created_at, updated_at, ...data } = user[0];
      // console.log("signin", user);
      let token = await generateToken(user[0]);
      req.session.userId = user[0].id;
      req.session.email = user[0].email;
      req.session.name = user[0].name;
      req.session.admin = user[0].admin;
      req.session.profile = user[0].profile;
      req.session.created_at = user[0].created_at;
      req.session.updated_at = user[0].updated_at;
      req.session.designation = user[0].designation;
      req.session.loggedin = true;
      req.session.save();
      res
        .status(201)
        .cookie("access_token", token, {
          // httpOnly: true,
          //   sameSite: "strict",
          secure: true,
          // httpOnly: true,
          sameSite: "None",
          maxAge: 10 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          data: data,
        });
    } else {
      return next("Invalid Email or Password");
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

const signout = (req, res, next) => {
  try {
    // console.log(req.session);
    req.session.loggedin = false;
    req.session.save();
    req.session.destroy();
    // console.log("user logout success");
    res.status({
      success: true,
      message: "logged out successfull",
    });
    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "User has been signed out",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  signIn,
  signout,
  testAuth,
};
