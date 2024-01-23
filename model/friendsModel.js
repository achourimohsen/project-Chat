const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Friends = mongoose.model("Freinds", friendsSchema);

module.exports = Friends;


















// const mongoose = require("mongoose");

// const invitationSchema = new mongoose.Schema(
//     {
//         sender: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         receiver: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         senderInvitation: {
//             type: String,
//             enum: ["pending", "accepted", "rejected"],
//             default: "pending"
//         },
//         receiverInvitation: {
//             type: String,
//             enum: ["pending", "accepted", "rejected"],
//             default: "pending"
//         }
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Invitation", invitationSchema);