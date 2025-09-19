import express from "express";
import axios from "axios";

const router = express.Router();

// POST /api/khalti/payment
router.post("/payment", async (req, res) => {
    const { amount, mobile, product_identity, product_name } = req.body;

    if (!amount || !mobile || !product_identity || !product_name) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const response = await axios.post(
            "https://khalti.com/api/v2/payment/initiate/",
            {
                return_url: "http://localhost:5000/api/khalti/success",
                amount: amount * 100, // Khalti expects paisa
                mobile,
                product_identity,
                product_name,
                public_key: "test_public_key_xxxxxxxx" // Replace with your Khalti test public key
            },
            {
                headers: {
                    "Authorization": "Key test_public_key_xxxxxxxx",
                    "Content-Type": "application/json"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Payment initiation failed", error: error.message });
    }
});

export default router; // ✅ This allows index.js to import it
