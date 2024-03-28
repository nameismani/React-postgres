const { getUserByEmail } = require("../models/auth.model");
const { updateUserById } = require("../models/user.model");

const updateUser = async (req, res, next) => {
  const { name, password } = req.body;
  let filename = req?.file ? `${req.file.filename}` : "";
  //   console.log(req.body, req.file);
  //   console.log(req.session.designation);
  //   console.log(password == "");
  if (!(filename !== "" || name !== "" || password !== "")) {
    return next("Please Enter any of the Feilds");
  }
  try {
    const updatedUser = await updateUserById(req, next);

    if (updatedUser) {
      const user = await getUserByEmail(req, updatedUser[0].email);
      let { password, created_at, updated_at, ...data } = updatedUser[0];
      //   console.log(updatedUser[0].name, req.session);
      req.session.userId = updatedUser[0].id;
      req.session.email = updatedUser[0].email;
      req.session.name = updatedUser[0].name;
      req.session.profile = updatedUser[0].profile;
      req.session.created_at = updatedUser[0].created_at;
      req.session.updated_at = updatedUser[0].updated_at;
      req.session.designation = user[0].designation;
      req.session.loggedin = true;
      req.session.save();
      res.status(201).json({
        data: {
          ...data,
          designation: req.session.designation,
          created_at: updatedUser[0].created_at,
          updated_at: updatedUser[0].updated_at,
        },
      });
    } else {
      return next("user does not updated ");
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { updateUser };
