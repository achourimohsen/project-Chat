const Notification = require("../model/notificationModel");

// send notification
const sendNotification = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body
    // send notification for client
    // io.to(receiver).emit('new-notification', content)

    // save notification in db
    const newNotification = new Notification({
      sender: sender,
      receiver: receiver,
      content: content
    })

    await newNotification.save()

    res.status(200).json({ message: "send notifiction is succcessful", data: newNotification })


  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const readNotifications = async (req, res) => {
  try {
    const { userId } = req.params
    const newNotif = await Notification.updateMany({ receiver: userId }, { read: true })

    res.status(200).json({ message: "read notification succefful", data: newNotif })


  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// const getNotifications = async (userId) => {
//     // const { userId } = req.params;

//     try {
//         const notifications = await Notification.find({ userId })
//             .populate("senderId", "username")
//             .populate("userId", "username");

//         return notifications;
//     } catch (err) {
//         return err;
//     }
// }


module.exports = {
  sendNotification,
  readNotifications
};
