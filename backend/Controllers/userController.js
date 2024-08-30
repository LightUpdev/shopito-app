import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/userModel.js";
import { generateToken } from "../utils/index.js";

const salt = bcrypt.genSaltSync(10);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //  validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  //  check password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be at least 6 characters");
  }
  //   check if user already exist
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists, please login");
  }

  //   Create a new user
  if (name && email && password) {
    const hashPassword = bcrypt.hashSync(password, salt);
    // Generate token
    const newUser = await User.create({ name, email, password: hashPassword });
    const token = generateToken(newUser._id);

    if (newUser) {
      const { _id, name, email, role, photo, phone, address } = newUser;
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        // secure: true,
        // sameSite: "none",
      });

      // send user data
      res
        .status(201)
        .json({ _id, name, email, role, photo, phone, address, token });
    } else {
      res.status(403);
      throw new Error("Invalid user data");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in the email and password");
  }

  //   check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid login credentials");
  }

  const token = generateToken(user._id);

  const newUser = await User.findOne({ email }).select("-password");
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    // secure: true,
    // sameSite: "none",
  });

  // send user data
  const { _id, name, role, photo, phone, address } = newUser;
  res.status(200).json({
    _id,
    name,
    email: newUser.email,
    role,
    photo,
    phone,
    address,
    token,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // secure: true,
    // sameSite: "none",
  });
  res.status(200).json({ message: "User is successfully logged out" });
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  try {
    if (!user) {
      res.status(401);
      throw new Error("Not Authorized , please login");
    }
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// const getLoginStatus = asyncHandler(async (req, res) => {
//   // get token
//   const token = req.cookies.token;

//   // verify token
//   const verified = jwt.verify(token, process.env.JWT_SECRET);

//   if (!verified.id) {
//     res.json(false);
//   }
//   if (verified.id) {
//     res.json(true);
//   }
// });

const verifyUser = asyncHandler(async (req, res) => {
  res.status(200).send({ isAuthenticated: true });
});

//  Update User data
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
//  Update User data
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);

  user.photo = photo;

  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

// get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export {
  registerUser,
  loginUser,
  updateUser,
  updatePhoto,
  verifyUser,
  getUser,
  logoutUser,
  getAllUser,
};
