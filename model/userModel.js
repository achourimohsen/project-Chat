const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
        }
    },
    { timestamp: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
