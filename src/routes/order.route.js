import express from "express";
import { initiatePayment, paymentSuccess, paymentFailure } from "../controllers/esewa.controller.js";
import { generateSignature } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/payment", initiatePayment);
router.get("/success", paymentSuccess);  // eSewa will redirect here on success
router.get("/failure", paymentFailure);  // eSewa will redirect here on failure

router.post('/generate-signature', generateSignature)

export default router;
