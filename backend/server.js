const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

const slotRoutes = require("./routes/slotRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/slots", slotRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
