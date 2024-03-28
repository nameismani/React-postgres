const { hashPasswrod } = require("../utils/customLogis");
const fsPromises = require("fs/promises");
const path = require("path");

const updateUserById = async (req, next) => {
  let { name, password } = req.body;
  let filename = req?.file ? `${req.file.filename}` : "";
  let hashedPasswrod;
  if (password) {
    hashedPasswrod = await hashPasswrod(password);
  }
  // Construct the SQL query with explicit data type casting
  //   console.log(
  //     path.join,
  //     __dirname,
  //     "public",
  //     "images",
  //     req.session.profile,
  //     req.session
  //   );

  if (req.session.profile && req.session.profile !== "avatar.png" && filename) {
    await fsPromises.unlink(
      path.join(__dirname, "..", "public", "images", req.session.profile)
    );
  }
  const query = `
    UPDATE "user"
    SET
      name = CASE WHEN $1 <> '' THEN $1 ELSE name END,
      password = CASE WHEN $2 <> '' THEN $2 ELSE password END,
      profile = CASE WHEN $3 <> '' THEN $3 ELSE profile END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;

  // Provide values array with proper data types
  const values = [name, hashedPasswrod, filename, parseInt(req.user.userId)];

  // Execute the SQL query
  try {
    const result = await req.app.get("db").query(query, values);
    // console.log(result.rows);
    if (result.rows.length <= 0) return false;
    return result.rows;
  } catch (err) {
    console.lo0g(err.message, "user.model.js");
  }
};

// onst updateUserById = async (req) => {
//   const { name, password } = req.body;
//   let filename = req?.file ? `${req.file.filename}` : "";
//   let result = await req.app
//     .get("db")
//     .query(
//       `UPDATE "user" SET name = $1, password = $2, profile=$3 WHERE id = $4`,
//       [name, password, filename, req.user.userId]
//     );
//   console.log(result.rows);
// };

module.exports = {
  updateUserById,
};
