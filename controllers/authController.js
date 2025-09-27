import bcrypt from "bcryptjs";
import User from "../models/userModel.js"; // Import User model

// Controller class for handling Google Sign In
export class googleSignInController {
  // ✅ Khi login thành công
  signInSuccess = async (req, res) => {
    try {
      if (!req.user || !req.user._json) {
        return res.status(403).json({ error: true, message: "Not Authorized" });
      }

      const { email, name, sub } = req.user._json;

      if (!email) {
        return res.status(403).json({ error: true, message: "Email not found in Google profile" });
      }

      // Kiểm tra user đã tồn tại trong DB chưa
      let user = await User.findOne({ email });
      if (!user) {
        // Nếu chưa có → tạo user mới
        const hashedPassword = await bcrypt.hash(sub, 10); // hash Google ID
        user = new User({
          username: name,
          email: email,
          password: hashedPassword, // ⚡ luôn hash trước khi lưu
        });
        await user.save();
      }

      // Lưu email vào session
      req.session.userEmail = email;

      // 👉 Render homepage
      return res.status(200).render("homepage", {
        message: `Welcome, ${user.username}`,
        siteKey: process.env.RECAPTCHA_SITE_KEY,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  };

  // ❌ Khi login thất bại
  signInFailed = (req, res) => {
    res.status(401).json({
      error: true,
      message: "Google login failed",
    });
  };
}
