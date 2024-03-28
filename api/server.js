const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v1 } = require("uuid");
const db = require("./models/createTable");
const app = express();
const path = require("path");
const errorMiddleware = require("./middleware/errorMiddleware");
const router = require("./routes");

const PORT = process.env.PORT || 8000;
const publicDirectoryPath = path.join(__dirname, "public");

dotenv.config();
// console.log(path.join(__dirname, "public"));
app.set("db", db);

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["POST", "GET", "PUT", "PATCH"],
    origin: ["http://localhost:5173", "https://mern-live-chat-app.netlify.app"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse application
app.use(cookieParser());
app.use(
  session({
    genid: function (req) {
      return v1(); // use UUIDs for session IDs
    },
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure:false,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.static(publicDirectoryPath));
console.log(process.env.JWT_SECRET_KEY);
app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
