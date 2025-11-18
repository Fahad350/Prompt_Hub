import express from "express";
import {
  handleAllPrompts,
  handleCreatePrompt,
  handleDeletePrompt,
  handleSignlePrompt,
  handleUpdatePromptByUser,
  handleUserPromptById,
} from "../controllers/promptController.js";
import { protect } from "../middleware/authMiddleware.js";

const routes = express();

// prompt create
routes.post("/create", protect, handleCreatePrompt);

// all prompt list get
routes.get("/list", protect, handleAllPrompts);

// prompt uniquly get
routes.get("/unique/:id", protect, handleSignlePrompt);

routes.put("/update/:id", protect, handleUpdatePromptByUser);

routes.delete("/delete/:id", protect, handleDeletePrompt);

// user's all prompts
routes.get("/individual/:id", protect, handleUserPromptById);

export default routes;
