const express = require("express");
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(express.json());

// Routes
const slotRoutes = require("./routes/slotRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api", slotRoutes);
app.use("/api", appointmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
