import express from "express";
import dotenv from "dotenv";

import dbConnection from "./connection/db.js";
import userRouter from "./routes/userRoutes.js";
import promptRouter from "./routes/promptRoutes.js";
import openAiRouter from "./routes/openAiRoutes.js";
import cors from "cors";

dotenv.config({ path: "./configuration/config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

dbConnection();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/prompt", promptRouter);
app.use("/api/v1/openai", openAiRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});

export default app;
