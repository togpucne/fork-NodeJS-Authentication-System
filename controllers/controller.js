import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { transporter } from "../config/nodemailerConfig.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export class UserGetController {
  getSignUpPage = (req, res) => {
    res.render("signup", { message: "", siteKey: process.env.RECAPTCHA_SITE_KEY });
  };

  getSignInPage = (req, res) => {
    res.render("signin", { message: "", siteKey: process.env.RECAPTCHA_SITE_KEY });
  };

  homePage = (req, res) => {
    const email = req.session.userEmail;
    if (!email) {
      return res.status(404).render("signin", { 
        message: "Please sign in to view the homepage", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }
    res.render("homepage");
  };

  getForgotPassword = (req, res) => {
  res.render("forgot-password", { message: "", siteKey: process.env.RECAPTCHA_SITE_KEY });
};


  getChangePassword = (req, res) => {
  const email = req.session.userEmail;
  if (!email) {
    return res.status(404).render("signin", { 
      message: "Please sign in to change the password", 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  }
  res.render("change-password", { 
    message: "", 
    siteKey: process.env.RECAPTCHA_SITE_KEY 
  });
};


  logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error signing out:", err);
        res.status(500).send("Error signing out");
      } else {
        res.status(201).render("signin", { 
          message: "User logout", 
          siteKey: process.env.RECAPTCHA_SITE_KEY 
        });
      }
    });
  };
}

export class UserPostController {
  // 🔹 Sign up
  createUser = async (req, res) => {
    const { username, email, password, cpassword } = req.body;
    if (password !== cpassword) {
      return res.status(400).render("signup", { 
        message: "Passwords don't match", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render("signup", { 
        message: "User already exists", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
      await newUser.save();
      res.status(201).render("signin", { 
        message: "User created successfully", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  // 🔹 Sign in
  signInUser = async (req, res) => {
    const { email, password } = req.body;
    const recaptcha = req.body["g-recaptcha-response"];

    if (!recaptcha) {
      return res.status(400).render("signin", { message: "Please select captcha", siteKey: process.env.RECAPTCHA_SITE_KEY });
    }

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

    try {
      const googleResponse = await fetch(url, { method: "POST" });
      const data = await googleResponse.json();

      if (!data.success) {
        return res.status(400).render("signin", { message: "Captcha verification failed", siteKey: process.env.RECAPTCHA_SITE_KEY });
      }

      // Sau khi captcha OK → kiểm tra user
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).render("signin", { message: "User doesn't exist", siteKey: process.env.RECAPTCHA_SITE_KEY });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).render("signin", { message: "Invalid credentials || Incorrect Password", siteKey: process.env.RECAPTCHA_SITE_KEY });
      }

      req.session.userEmail = email;
      return res.redirect("/user/homepage");
    } catch (error) {
      console.error("Sign in error:", error);
      return res.status(500).render("signin", { message: "Internal server error", siteKey: process.env.RECAPTCHA_SITE_KEY });
    }
  };

  // 🔹 Forgot password
forgotPassword = async (req, res) => {
  const { email } = req.body;
  const recaptcha = req.body["g-recaptcha-response"];

  if (!recaptcha) {
    return res.status(400).render("forgot-password", { 
      message: "Please select captcha", 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

  try {
    const googleResponse = await fetch(url, { method: "POST" });
    const data = await googleResponse.json();

    if (!data.success) {
      return res.status(400).render("forgot-password", { 
        message: "Captcha verification failed", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    // Nếu captcha OK → check user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).render("forgot-password", { 
        message: "User doesn't exist", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,   // ✅ dùng Mailtrap config
        to: email,
        subject: "Password Reset",
        text: `Your new password is: ${newPassword}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("forgot-password", { 
        message: "Email sending failed: " + error.message, 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(201).render("signin", { 
      message: "✅ New Password sent to your email (check Mailtrap inbox)", 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  } catch (error) {
    res.status(500).render("forgot-password", { 
      message: error.message, 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  }
};

  // change password
changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const recaptcha = req.body["g-recaptcha-response"];

  if (!recaptcha) {
    return res.status(400).render("change-password", { 
      message: "Please select captcha", 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;

  try {
    const googleResponse = await fetch(url, { method: "POST" });
    const data = await googleResponse.json();

    if (!data.success) {
      return res.status(400).render("change-password", { 
        message: "Captcha verification failed", 
        siteKey: process.env.RECAPTCHA_SITE_KEY 
      });
    }

    const email = req.session.userEmail;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).render("change-password", { message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).render("change-password", { message: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(201).render("signin", { 
      message: "Password changed successfully", 
      siteKey: process.env.RECAPTCHA_SITE_KEY 
    });
  } catch (error) {
    res.status(500).render("change-password", { message: error.message });
  }
};
}
