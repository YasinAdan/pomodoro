import { userSignup, userAuth, saveUserSession, getUserSessions } from "../controllers/controller.user.js"
import express from "express";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userAuth);
router.post("/save", saveUserSession);
router.get("/get", getUserSessions);

export default router;