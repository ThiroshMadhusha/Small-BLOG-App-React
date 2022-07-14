import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getById,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller";

const blogRouter = express.Router();

// Create Blog Posts Routes
blogRouter.get("/", getAllBlog);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
