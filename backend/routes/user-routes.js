import express from "express";
import { getAllUser, signin, signup } from "../controllers/user-controller";

const router = express.Router();

// Create All User Routes
router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
