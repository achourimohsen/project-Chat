const Message = require("../model/messageModel")

// send message
const sendMessage = async(req, res) => {
  try {
    const { sender, receiver, message} = req.body
    // send mssge for client
    io.to(receiver).emit('new-message', message)

    // save message in db
    const newMessage = new Message({
      sender: sender,
      receiver: receiver,
      message: message
    })

    await newMessage.save()

    res.status(200).json({message: "send mssage is succcessful",data: newMessage})

  } catch(err) {
    res.status(404).json({ error: err.message})
  }
}

// get All mssges
const getAllMessage = async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// update mssge status
const updateMessageStatus = async (req, res) => {
  try {
    const messageId = req.params.id;
    // Validate input data

    // Update the message status in the database
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { $set: { status: 'read' } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Message status updated successfully', updatedMessage });
  } catch (error) {
    console.error("Error updating message status:", error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// delete mssge
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    // Validate input data

    // Delete the message from the database
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error("Error deleting message:", error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



module.exports = {
  sendMessage,
  getAllMessage,
  updateMessageStatus,
  deleteMessage
}
