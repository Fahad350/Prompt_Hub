import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/userSchema.js";

export const handleResgister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await user.findOne({ email });
    if (isExist) {
      return res.status(409).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "user registered successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return res.status(400).json({
      message: "user registeration error",
      error: error.message,
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isMatch = await user.findOne({ email });
    if (!isMatch) {
      return res.status(401).json({
        message: "email or password incorrect",
      });
    }
    const isCompare = await bcrypt.compare(password, isMatch.password);
    if (!isCompare) {
      return res.status(401).json({
        message: "email or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: isMatch._id,
        email: isMatch.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "login successfully!",
      user: { id: isMatch._id, name: isMatch.name, email: isMatch.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "credentials doesnot match",
      error: error.message,
    });
  }
};
