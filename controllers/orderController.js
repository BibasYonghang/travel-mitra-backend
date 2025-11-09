import crypto from 'crypto';

export const generateSignature = (req, res) => {
    try {
        const { amount, phone, fullName } = req.body;

        const transaction_uuid = `order-${Math.floor(Math.random() * 1000000)}`;
        const product_code = "EPAYTEST";
        const tax_amount = 0;
        const product_service_charge = 0;
        const product_delivery_charge = 0;
        const total_amount = amount + tax_amount + product_service_charge + product_delivery_charge;

        const signed_field_names = "total_amount,transaction_uuid,product_code";

        // Create the string to sign in order
        const stringToSign = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

        // Replace this key with your eSewa secret key
        const secretKey = process.env.ESEWA_SECRET_KEY || "YOUR_SECRET_KEY";

        // Generate HMAC SHA-256 signature
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(stringToSign)
            .digest('base64');

        return res.json({
            amount,
            tax_amount,
            total_amount,
            transaction_uuid,
            product_code,
            product_service_charge,
            product_delivery_charge,
            success_url: 'https://travel-mitra-backend.onrender.com/payment-success',
            failure_url: 'https://travel-mitra-backend.onrender.com/payment-failure',
            signed_field_names,
            signature
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to generate signature" });
    }
};
