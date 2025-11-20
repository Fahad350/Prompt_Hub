import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB
      const user = await User.findById(decoded.id).select("name email"); // only necessary fields

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user; // attach full user object
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
