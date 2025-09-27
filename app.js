import express from "express"; // Web framework
import bodyParser from "body-parser"; // Parsing body
import ejsLayouts from "express-ejs-layouts"; // Layout support
import path from "path"; // Path handling
import dotenv from "dotenv"; // Env variables
import session from "express-session"; // Session management
import passport from "passport"; // Authentication
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Google OAuth 2.0

import { connectUsingMongoose } from "./config/mongodb.js"; // MongoDB connection
import router from "./routes/routes.js"; // User routes
import authrouter from "./routes/authRoutes.js"; // Auth routes

dotenv.config(); // Load .env
const app = express(); // Initialize app

// ===================== SESSION =====================
app.use(
  session({
    secret: "SecretKey", // 👉 nên để trong .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // secure:true chỉ khi chạy HTTPS
  })
);

// ===================== MIDDLEWARE =====================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Captcha key (truyền cho view)
app.use((req, res, next) => {
  res.locals.RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
  next();
});

// Custom Middleware: MSSV + Họ tên (cho demo)
app.use((req, res, next) => {
  res.locals.student = {
    id: "22655111",
    name: "Nguyen Trong Phuc",
  };
  next();
});

// ===================== PASSPORT GOOGLE OAUTH =====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
       clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL // cũng lấy từ .env
    },
    (accessToken, refreshToken, profile, done) => {
      // Google xác thực xong → trả profile
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// ===================== VIEW ENGINE =====================
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("views", path.join(path.resolve(), "views"));

// ===================== DB CONNECTION =====================
connectUsingMongoose();

// ===================== ROUTES =====================
app.get("/", (req, res) => {
  res.send("Hey Ninja ! Go to /user/signin for the login page.");
});
app.use("/user", router);
app.use("/auth", authrouter);

// Static assets
app.use(express.static("public"));

// ===================== SERVER LISTEN =====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
