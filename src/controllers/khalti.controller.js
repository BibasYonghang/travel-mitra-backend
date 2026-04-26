import axios from "axios";
import { initiateKhaltiPayment } from "../services/khalti.service.js";

export const initiatePayment = async (req, res) => {
  try {
    const { amount, purchase_order_id, purchase_order_name } = req.body;

    const user = req.user; // from auth middleware

    const payload = {
      return_url: `${process.env.FRONTEND_URL}/khalti-payment-result`,
      website_url: process.env.FRONTEND_URL,
      amount,
      purchase_order_id,
      purchase_order_name,

      customer_info: {
        name: req.body.name || "Guest User",
        email: req.body.email || "guest@example.com",
        phone: req.body.phone || "9800000000",
      },

      amount_breakdown: [
        {
          label: "Product Price",
          amount: amount,
        },
      ],

      product_details: [
        {
          identity: purchase_order_id,
          name: purchase_order_name,
          total_price: amount,
          quantity: 1,
          unit_price: amount,
        },
      ],

      merchant_username: "Bibas Yonghang",
      merchant_extra: "bibasyonghang100@gmail.com",
    };
    console.log("PAYLOAD SENT TO KHALTI:", payload);
    const data = await initiateKhaltiPayment(payload);

    return res.json({
      payment_url: data.payment_url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      },
    );

    return res.json(response.data);
  } catch (error) {
    console.error("VERIFY ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Verification failed",
    });
  }
};
