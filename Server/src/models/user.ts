import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, min: 5 },
});

export default mongoose.model("User", UserModel);
