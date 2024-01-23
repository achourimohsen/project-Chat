const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
