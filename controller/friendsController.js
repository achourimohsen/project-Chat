const Friends = require("../model/friendsModel");

// send friend request
const sendFriendRequest = async(req, res) =>{
    try {
        const { user, friend, status} = req.body
        // send friend request at client
        io.to(friend).emit('new-friend-request', status)
    
        // save friends request in db
        const newFriendRequest = new Friends({
            user: user,
            friend: friend,
            status: "pending"
        })
    
        await newFriendRequest.save()

        res.status(200).json({message: "send friend request is succcessful", data: newFriendRequest})
    
    
      } catch(err) {
        res.status(500).json({ error: err.message})
      }
}

const acceptFriendRequest = async(req, res) => {
    try {
        const { userId, friendRequestId} = req.body
        // update friend requedt tooo "accepted"
        await Friends.findByIdAndUpdate(friendRequestId, {status: 'accepted'})

        //  tnajim tab3th notifi willa messge at client 
        io.to(userId).emit('friend-request-accepted', "send request is accept")

        res.status(200).json({ message: "friend request was successfully accepted" })
    
    
      } catch(err) {
        res.status(500).json({ error: err.message})
      }
}

const rejectFriendRequest = async(req, res) => {
    try {
        const { userId, friendRequestId } = req.body
        // update friend requedt tooo "rejected"
        await Friends.findByIdAndUpdate(friendRequestId, {status: 'rejected'})

        //  tji ll client fama rafdh
        io.to(userId).emit('friend-request-rejected', "friend request was rejected")

        res.status(200).json({message: "friend request was successfully rejected"})
    
    
      } catch(err) {
        res.status(500).json({ error: err.message})
      }
}


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
}





