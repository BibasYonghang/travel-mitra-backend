import express from "express";
import { chatController } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/chat", chatController);
router.post("/ai/chat", chatController);

export default router;
