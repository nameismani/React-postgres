const { hashPasswrod } = require("../utils/customLogis");

const getUserById = async (req, res) => {
  const { id } = req.params;
  let result = await req.app
    .get("db")
    .query('SELECT id,name,email,profile FROM "user" WHERE id = $1', [id]);
  if (result.rows.length <= 0) return false;
  return result.rows;
};

// const getUserByEmail = async (req, res) => {
//   const { email } = req.body;
//   let result = await req.app
//     .get("db")
//     .query('SELECT * FROM "user"  WHERE email = $1', [email]);
//   if (result.rows.length <= 0) return false;
//   return result.rows;
// };

const getUserByEmail = async (req, email) => {
  let result = await req.app
    .get("db")
    .query(
      'SELECT "user".*, "designation".designation FROM "user" JOIN "designation" ON "user".designationid = "designation".id WHERE "user".email = $1',
      [email]
    );
  // console.log(result.rows);
  if (result.rows.length <= 0) return false;
  return result.rows;
};

const addUser = async (req, res) => {
  let { name, email, password, designation } = req.body;
  let filename = req?.file ? `${req.file.filename}` : "";

  if (!filename) filename = "avatar.png";
  let hashedPasswrod = await hashPasswrod(password);

  let result = await req.app
    .get("db")
    .query(
      'INSERT INTO "user" (name, email, password,profile,designationid) VALUES ($1, $2, $3,$4,$5) RETURNING *',
      [name, email, hashedPasswrod, filename, Number(designation)]
    );
  // console.log("dsdf");
  // console.log(result.rows);
  if (result.rows.length <= 0) return false;
  return result.rows;
};
module.exports = { getUserByEmail, getUserById, addUser };
