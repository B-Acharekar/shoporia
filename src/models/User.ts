import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: false }, // allow null for Google
  image: String,
  role: { type: String, default: "user" }, // 'admin' or 'user'
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
