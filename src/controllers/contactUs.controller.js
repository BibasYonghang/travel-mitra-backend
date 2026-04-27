import { ContactUs } from "../models/ContactUs.js";

export const contactUsController = async (req, res) => {
  try {
    // 1. Get data from request body
    const { name, email, message } = req.body;

    // 2. Basic validation (always validate before DB)
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3. Create new document
    const newContact = new ContactUs({
      name,
      email,
      message,
    });

    // 4. Save to database
    await newContact.save();

    // 5. Send success response
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    // 6. Error handling
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
