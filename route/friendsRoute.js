const express = require("express");
const Friend = require("../controller/friendsController");
const router = express.Router();



router.post("/send-invitation", Friend.sendFriendRequest);
router.get("/accept-friend-request/:userId", Friend.acceptFriendRequest);
router.get("/reject-friend-request/:userId", Friend.rejectFriendRequest);



module.exports = router;



