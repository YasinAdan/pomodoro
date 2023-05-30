import { userSignup, userAuth, saveUserSession } from "../controllers/controller.user.js"
import express from "express";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userAuth);
router.post("/save", saveUserSession);

export default router;