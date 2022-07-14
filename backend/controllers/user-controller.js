import User from "../models/User";
import bcrypt from "bcryptjs";

// Get All Users in "GET" Method Controller(READ CRUD Operation)
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

// Create "POST" Method Contriller For SignUp (CREATE CRUD Operation)

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validation using let
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    // using findOne for select 1 data for in the database
  } catch (error) {
    return console.log(error);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User Is Already Available" });
  }

  // For Encrypt The Password
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

// Create "POST" Method Contriller For SignIn (CREATE CRUD Operation)

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    // using findOne for select 1 data for in the database
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User Can not Find This Email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ message: "Incorrect PAssword..! Try Again..!" });
  }
  return res.status(200).json({ message: "USer Login Successful..!" });
};
