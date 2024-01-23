const express = require("express")
const cors = require("cors")
const http = require ("http")
const secketIo = require("socket.io")
const connectDB = require("./config/database");

const app = express()
const server = http.createServer(app)
const io = secketIo(server)

// Connect to the database
connectDB()

// Route
const userRouter = require("./route/userRoute")
const messageRouter = require("./route/messageRoute")
const notificationRouter = require("./route/notificationRoute")
const friendsRoutes = require("./route/friendsRoute")

app.use(express.json())
app.use(cors())

// Route
app.use("/user", userRouter)
app.use("/message", messageRouter)
app.use("/notification", notificationRouter)
app.use("/friend", friendsRoutes)

// Model
const User = require("./model/userModel")

// io
io.on("connection", (Socket) => {
    console.log("New User Cnncteddd")

    // handle mssges
    Socket.on('send-message', async(data) => {
        // send mssges
        io.to(data.receiver).emit('new-message', data.message)

        //  mise a jrs db for save mssge
        try{
            const sender = await User.findById(data.sender)
            const receiver = await User.findById(data.receiver)

            const newMessage = new Message({
                sender: sender,
                receiver: receiver,
                content: data.message
            })

            await newMessage.save()
        } catch(error) {
            console.log("Error Updating database:", error.message)
        }
    })

    


})


const {success, error} = require("consola")

const port = 9000
// Test part
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    try {
        success({
            message: `Success to port ${port}`,
            badge: true,
        });
    } catch (error) {
        error({ message: error.message });
    }
});






// server.listen(port, () => {
//     console.log(`server is runnnning on port ${port}`)
// })