import express from "express";

const router = express.Router();

// Create Blog Posts Routes
router.get("/", getAllBlog);

export default router;
