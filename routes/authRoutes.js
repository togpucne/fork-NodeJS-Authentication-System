import express from "express";
import passport from "passport";  // Passport middleware
import dotenv from "dotenv";      // Load env
import { googleSignInController } from "../controllers/authController.js"; 

dotenv.config();

const authRouter = express.Router();
const googleSignIn = new googleSignInController();

// ========== GOOGLE OAUTH ROUTES ==========

// 👉 Khi user bấm "Sign In with Google"
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// 👉 Google gọi lại callback sau khi xác thực
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    if (req.user && req.user.emails && req.user.emails.length > 0) {
      req.session.userEmail = req.user.emails[0].value;
    }
    // 👉 Redirect thẳng về trang homepage
    res.redirect("/user/homepage");
  }
);


// ========== LOGIN RESULT ROUTES ==========
authRouter.get("/login/success", googleSignIn.signInSuccess);
authRouter.get("/login/failed", googleSignIn.signInFailed);

// ========== LOGOUT ==========
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout error", error: err });
    }
    req.session.destroy();
    res.redirect("/user/signin");
  });
});

export default authRouter;
