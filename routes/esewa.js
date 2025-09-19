import express from "express";
const router = express.Router();

// 1️⃣ Initiate Payment
router.post("/payment", (req, res) => {
    const { amount, phone, fullName } = req.body;
    if (!amount || !phone || !fullName) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const pid = "TXN" + Date.now(); // Unique transaction ID
    const paymentUrl = `https://uat.esewa.com.np/epay/main?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&pid=${pid}&scd=${process.env.ESEWA_MERCHANT_ID}&su=${process.env.ESEWA_SUCCESS_URL}&fu=${process.env.ESEWA_FAILURE_URL}`;

    res.json({ paymentUrl, pid });
});

// 2️⃣ Success callback
router.get("/success", (req, res) => {
    const { oid, amt, refId } = req.query;
    res.send(`
        <h1>Payment Successful!</h1>
        <p>Order ID: ${oid}</p>
        <p>Amount: NPR ${amt}</p>
        <p>Reference ID: ${refId}</p>
    `);
});

// 3️⃣ Failure callback ✅
router.get("/failure", (req, res) => {
    res.send("<h1>Payment Failed. Please try again.</h1>");
});

export default router;
