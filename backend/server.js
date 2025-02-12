const express = require("express");
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(express.json());

// Routes
const slotRoutes = require("./routes/slotRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api", slotRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", userRoutes); // Admin, user routes
app.use("/api", notificationRoutes); // Notification routes

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
