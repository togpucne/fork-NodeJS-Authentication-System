import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { UserPostController } from "../controllers/controller.js"; // ✅ dùng chung controller chính

dotenv.config();

const authRouter = express.Router();
const userPostCtrl = new UserPostController();

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
  userPostCtrl.googleSignInSuccess  // ✅ lưu user vào MongoDB + redirect homepage
);

// ========== LOGIN RESULT ROUTES ==========
authRouter.get("/login/success", userPostCtrl.googleSignInSuccess);
authRouter.get("/login/failed", userPostCtrl.googleSignInFailed);

// ========== LOGOUT ==========
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Logout error", error: err });
    }
    req.session.destroy();
    res.redirect("/user/signin");
  });
});

export default authRouter;
