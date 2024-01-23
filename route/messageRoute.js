const userMessage = require("../controller/messageController")
const express = require("express")
const router = express.Router()


router.post("/send-message", userMessage.sendMessage)
router.get("/get-all-messages", userMessage.getAllMessage)
router.put("/update/:id", userMessage.updateMessageStatus)
router.delete("/delete/:id", userMessage.deleteMessage)

module.exports = router