import axios from "axios";
import { khaltiConfig } from "../config/khalti.js";

export const initiateKhaltiPayment = async (payload) => {
  try {
    const response = await axios.post(khaltiConfig.baseUrl, payload, {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Khalti API Error:", error.response?.data || error.message);
    throw new Error("Khalti payment initiation failed");
  }
};
