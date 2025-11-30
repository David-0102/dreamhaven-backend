require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --------------------
// CONNECT TO MONGODB ATLAS
// --------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,                         // enforce secure connection
      tlsAllowInvalidCertificates: true, // allow connection even if certificate warnings exist
    });
    console.log("🔥 MongoDB Atlas Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // stop the server if DB fails
  }
}
connectDB();

// --------------------
// IMPORT ROUTES
// --------------------
const packageRoutes = require("./routes/package.routes");
const bookingRoutes = require("./routes/booking.routes");
const visaRoutes = require("./routes/visa.routes");
const contactRoutes = require("./routes/contact.routes");
const userRoutes = require("./routes/user.routes");

// USE ROUTES
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

// --------------------
// PAYSTACK SETUP
// --------------------
const Paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

app.post("/api/pay", async (req, res) => {
  const { amount, email } = req.body;

  try {
    const response = await Paystack.transaction.initialize({
      amount: amount * 100,
      email,
      currency: "KES",
      channels: ["card", "mobile_money"],
    });

    res.json({
      status: true,
      authorization_url: response.data.authorization_url,
      reference: response.data.reference,
    });
  } catch (error) {
    console.error("PAYSTACK ERROR:", error);
    res.status(500).json({
      status: false,
      message: "Payment initialization failed",
    });
  }
});

// --------------------
// TEST ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("DreamHaven Quest Backend is running 🚀");
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ Server running on port ${PORT}`);
});
