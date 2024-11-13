const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const poolInstance = require("./db/pool");
const pgSession = require("connect-pg-simple")(session);
const signUpRouter = require("./routes/signUpRouter");
const logInRouter = require("./routes/logInRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const pgStore = new pgSession({
  pool: poolInstance,
  tableName: "members",
  createTableIfMissing: true,
});

app.use(
  session({
    secret: "test",
    store: pgStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log(req.session);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/log-in", logInRouter);

app.use("/sign-up", signUpRouter);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
