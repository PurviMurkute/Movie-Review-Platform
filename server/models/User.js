import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png", // fallback avatar
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
},{
    timestamps: true
});

const User = model("User", userSchema);

export default User;
