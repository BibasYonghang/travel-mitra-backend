import express from "express";
import { initiatePayment, paymentSuccess, paymentFailure } from "../controllers/esewa.js";
import { generateSignature } from "../controllers/orderController.js";

const router = express.Router();

router.post("/payment", initiatePayment);
router.get("/success", paymentSuccess);  // eSewa will redirect here on success
router.get("/failure", paymentFailure);  // eSewa will redirect here on failure

router.post('/generate-signature', generateSignature)

export default router;
