const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const hashPasswrod = async (Password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(Password, salt);
  return hash;
};

const generateToken = async (user) => {
  // const { password, created_at, updated_at, desiginationid, ...data } = user;
  return JWT.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const comparePassWord = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports = {
  hashPasswrod,
  generateToken,
  comparePassWord,
};
