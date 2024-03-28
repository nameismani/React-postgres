const db = require("./database");

const create_table_user = `
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
    DesignationId INT,
    Admin INT DEFAULT 0,
    PROFILE VARCHAR(255) DEFAULT 'avatar.png',
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP,
    CONSTRAINT user_designation_constraint FOREIGN KEY (DesignationId) REFERENCES designation (id) ON DELETE CASCADE ON UPDATE CASCADE
);
`;

const create_table_designation = `
CREATE TABLE IF NOT EXISTS "designation" (
    id SERIAL PRIMARY KEY,
    Designation VARCHAR(255)
);
`;
db.query(create_table_user, (err, result) => {
  if (err) {
    return console.log(`error occured during creating table ${err}`);
  }
  console.log("table created");
});
db.query(create_table_designation, (err, result) => {
  if (err) {
    return console.log(`error occured during creating table ${err}`);
  }
  console.log("table created");
});

// db.query(
//   'INSERT INTO "designation" (id, designation) VALUES ($1, $2) RETURNING *',
//   [3, "Full Stack Developer"],
//   (err, result) => {
//     if (err) {
//       return console.log(`error occured during creating table ${err}`);
//     }
//     console.log(result.rows);
//   }
// );

module.exports = db;
