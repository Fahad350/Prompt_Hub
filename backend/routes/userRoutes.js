import express from "express";
import { handleLogin, handleResgister } from "../controllers/userController.js";

const routes = express();

routes.post("/register", handleResgister);
routes.post("/login", handleLogin);

export default routes;
