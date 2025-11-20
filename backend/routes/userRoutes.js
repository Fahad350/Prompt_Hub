import express from "express";
import {
  handleLogin,
  handleResgister,
  handleUserInfo,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const routes = express();

routes.post("/register", handleResgister);
routes.post("/login", handleLogin);
routes.get("/me", protect, handleUserInfo);

export default routes;
