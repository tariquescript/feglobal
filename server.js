// server.js

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Email / API route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, msg: "All fields required" });
  }
  try {
    // transporter config ...
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Contact Form",
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`
    });
    res.json({ success: true, msg: "Email sent" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ success: false, msg: "Email failed" });
  }
});

// Fallback route — this is optional if you want to serve index.html for all non-API paths
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
