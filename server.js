require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); 


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // <-- REQUIRED to read JSON body

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("Received body:", req.body); // debugging log

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Message from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Save to Google Sheet
await fetch(process.env.GOOGLE_SHEET_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, phone, message })
});


    return res.json({ success: true, msg: "Email sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    return res.status(500).json({ success: false, error: "Email failed to send" });
  }
});

console.log("ENV:", {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS ? "LOADED" : "MISSING"
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;

