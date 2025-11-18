import jwt from "jsonwebtoken";
import User from "../models/userSchema.js"; // make sure you have a User model

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to request (you can include other fields if needed)
      req.user = {
        _id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      };

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
