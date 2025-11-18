import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db conncented successfully!");
    })
    .catch(() => {
      console.log("db connection error:", err.mongoose);
    });
};

export default dbConnection;
