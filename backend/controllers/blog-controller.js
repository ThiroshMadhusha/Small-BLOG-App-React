import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

// READ Blog CRUD Operation
export const getAllBlog = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Posts Founded..!" });
  }
  return res.status(200).json({ blogs });
};

// Create Blog CRUD Operation
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  // 1 user can handle multiple blogs nisa
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable To Find User By This ID" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ blog });
};

// UPDATE Blog CRUD Operation
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable To Update Blog ..!" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;

  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Posts Founded..!" });
  }
  return res.status(200).json({ blog });
};

// Delete CRUD Operation

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;

  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res
      .status(400)
      .json({ message: "Unable To Delete Blog Post..! Try Again.!" });
  }
  return res.status(200).json({ message: "Blog Post Delete Successful..!" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userBlogs;

  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Founded..!" });
  }
  return res.status(200).json({ user: userBlogs });
};
