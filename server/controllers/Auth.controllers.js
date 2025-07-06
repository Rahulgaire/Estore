const User = require("../models/User.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendOTP = require('../middleware/Nodemailer')

const generatToken = (id, role) => {
  jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 0,
        message: "Each field is required",
      });
    }
    console.log(email);
    const match = await User.findOne({ email });
    console.log(match);
    if (match) {
      return res.status(400).json({
        status: 0,
        message: "User already Exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashPassword,
      role,
    });
    await user.save();
    const token = jwt.sign(
      { id: User._id, role: User.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      status: 1,
      message: "User Registered Successfully",
      data: { name: user.username, email: user.username, token },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    const hashPassword = await bcrypt.compare(password, user.password);
    if (!user || !hashPassword) {
      return res.status(400).json({
        status: 0,
        message: "Invalid Credentials",
      });
    }

    const otp = genOtp();
    user.otp = otp;
    user.otpExp = Date.now() + 5 * 60 * 1000;
    await user.save();
    await sendOTP(user.email, otp);
    res.status(200).json({
      status: 1,
      message: "Otp Sent",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      status: 1,
      message: "User Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const newUser = await User.findOne({ email });
    if (!newUser) {
      return res.status(400).json({
        status: 0,
        message: "Invalid User",
      });
    }
    if (newUser.otpExp < Date.now()) {
      return res.status(400).json({
        status: 0,
        message: "Otp has Expired ",
      });
    }
    if (newUser.otp !== otp) {
      return res.status(400).json({
        status: 0,
        message: "Invalid Otp ! Try Again",
      });
    }
    const token = jwt.sign(
      { id: User._id, role: User.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      status: 1,
      message: "User verified successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: 1,
      error: error.message,
    });
  }
};
const genOtp = () => Math.floor(Math.random() * 9000) + 1000;

module.exports = { register, login, verifyOtp, logout };
