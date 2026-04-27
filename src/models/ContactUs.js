import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces (e.g., "  John  " → "John")
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // ensures consistency (e.g., USER@GMAIL.COM → user@gmail.com)

      // Regex validation for email format
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],

      index: true, // improves query performance for search/filter by email
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },

    isResolved: {
      type: Boolean,
      default: false,
      // useful for admin panel (track whether query is handled)
    },
  },
  {
    timestamps: true,
    // automatically adds:
    // createdAt → when message was submitted
    // updatedAt → when it was last updated
  },
);

// Optional: prevent duplicate spam submissions (same email + message)
contactUsSchema.index({ email: 1, message: 1 }, { unique: false });

// Export model
export const ContactUs = mongoose.model("ContactUs", contactUsSchema);
