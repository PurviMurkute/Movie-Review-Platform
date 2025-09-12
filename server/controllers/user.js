import User from "../models/User.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const postSignUp = async (req, res) => {
  const { username, email, password, profile, joinDate } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fiels are required",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "User with this email already exists",
    });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      success: false,
      data: null,
      message:
        "Password must be at least 6 characters long and contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
    });
  }

  const salt = await genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: encryptedPassword,
    profile,
    joinDate
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json({
      success: true,
      data: savedUser,
      message: "SignUp Successful",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fiels are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid email or password",
    });
  }

  user.password = undefined; 

  const jwtToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );

  res.status(200).json({
    success: true,
    data: user,
    jwtToken: jwtToken,
    message: "Login Successful",
  });
};


export { postSignUp, postLogin };