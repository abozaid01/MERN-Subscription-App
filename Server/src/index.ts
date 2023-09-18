import express from "express";
import monogoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth";

// DB connection
monogoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("connected with DB"))
  .catch((e) => {
    throw new Error(e);
  });

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

app.listen("8000", () => {
  console.log(`Listening on port 8000`);
});
