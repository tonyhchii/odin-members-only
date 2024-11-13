const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const poolInstance = require("./db/pool");
const bcrypt = require("bcryptjs");
const pgSession = require("connect-pg-simple")(session);
const LocalStrategy = require("passport-local").Strategy;
const signUpRouter = require("./routes/signUpRouter");

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await poolInstance.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await poolInstance.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log(req.session);
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/sign-up", signUpRouter);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
