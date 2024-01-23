const express = require("express");
const Notification = require("../controller/notificationController");
const router = express.Router();

router.post("/send-notification", Notification.sendNotification);
router.get("/read-notification", Notification.readNotifications);

module.exports = router;
