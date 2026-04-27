import express from "express";
import { contactUsController } from "../controllers/contactUs.controller.js";

const router = express.Router();

router.post("/", contactUsController);

export default router;
