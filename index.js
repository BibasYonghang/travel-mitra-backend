import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// 1️⃣ START PAYMENT
// app.post("/api/esewa/payment", (req, res) => {
//     // Esewa integration commented out for Khalti testing
//     /*
//     const { amount, phone, fullName } = req.body;
//     if (!amount || !phone || !fullName) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }
//     const pid = "TXN" + Date.now(); // Unique transaction ID
//     const paymentUrl = `https://uat.esewa.com.np/epay/main?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&pid=${pid}&scd=${process.env.ESEWA_MERCHANT_ID}&su=${process.env.ESEWA_SUCCESS_URL}&fu=${process.env.ESEWA_FAILURE_URL}`;
//     res.json({ paymentUrl, pid });
//     */
//     res.status(501).json({ message: "Esewa integration is commented out. Use /api/khalti/payment for Khalti test." });
//     // 1️⃣ Khalti Payment Initiation (Top-level route)



app.post("/api/khalti/payment", async (req, res) => {
    const { amount, mobile, product_identity, product_name } = req.body;
    if (!amount || !mobile || !product_identity || !product_name) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const response = await axios.post(
            "https://khalti.com/api/v2/payment/initiate/",
            {
                return_url: "http://localhost:5000/api/khalti/success",
                amount: amount * 100, // Khalti expects amount in paisa
                mobile,
                product_identity,
                product_name,
                public_key: "test_public_key_xxxxxxxx" // Replace with your Khalti test public key
            },
            {
                headers: {
                    "Authorization": "Key test_public_key_xxxxxxxx", // Replace with your Khalti test public key
                    "Content-Type": "application/json"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Payment initiation failed", error: error.message });
    }
});

// Khalti Success Callback (for demonstration)
app.get("/api/khalti/success", (req, res) => {
    res.send("<h1>Khalti Payment Successful!</h1>");
});

// 2️⃣ SUCCESS CALLBACK
app.get("/api/esewa/success", (req, res) => {
    const { oid, amt, refId } = req.query;
    res.send(`
        <h1>Payment Successful!</h1>
        <p>Order ID: ${oid}</p>
        <p>Amount: NPR ${amt}</p>
        <p>Reference ID: ${refId}</p>
    `);
});

app.use("/api/trails", trailRoutes);

// 3️⃣ FAILURE CALLBACK
app.get("/api/esewa/failure", (req, res) => {
    res.send("<h1>Payment Failed. Please try again.</h1>");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
