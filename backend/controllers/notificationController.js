const db = require("../config/db");

const notificationController = {
  getNotifications: async (req, res) => {
    const { userId } = req.params;
    const query = "SELECT * FROM notifications WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching notifications", error: err });
      }
      res.json(results);
    });
  },

  createNotification: async (req, res) => {
    const { userId, message } = req.body;
    const query = "INSERT INTO notifications (user_id, message) VALUES (?, ?)";
    db.query(query, [userId, message], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating notification", error: err });
      }
      res
        .status(201)
        .json({ message: "Notification created successfully", result });
    });
  },
};

module.exports = notificationController;
