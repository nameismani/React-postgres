const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "Mani#1766256",
  database: "empdb",
  dialect: "postgres",
  port: 5432,
});

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.log(`error occured during connection ${err}`);
//   }
//   client.query("SELECT NOW()", (err, result) => {
//     release();
//     if (err) {
//       return console.log(`error occured executing query ${err}`);
//     }
//     console.log("connected to dabase");
//   });
// });

module.exports = pool;
