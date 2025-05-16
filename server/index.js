const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserModel = require('./models/user');
const MessageModel = require('./models/messages');

const http = require ('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectionString = "mongodb+srv://nethmi:123@cluster0.ipbnfrs.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionString).then(() =>{
    console.log("Database Connected");
}).catch((err) =>{
    console.log(err);
    console.log("MongoDB Not Connected");}
)

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET","POST"],
    },
});

io.on("connection",(Socket)=>{
    console.log(`User Connected: ${Socket.id}`);

    Socket.on("join_room", async (data)=>{
        Socket.join(data);
        console.log(`User with ID: ${Socket.id} joined room: ${data}`)


    // Send existing chat history from DB
    try {
      const messages = await MessageModel.find({ room: data }).sort({ createdAt: 1 });
      Socket.emit("chat_history", messages);
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }

    });

    Socket.on("send_message",async (data)=>{
       try{
        // Save to DB
      await MessageModel.create(data);

        Socket.to(data.room).emit("receive_message",data)
       }catch(err){
         console.error("Error saving message:", err);
       }
    });

    Socket.on("disconnect",()=>{
        console.log("user Disconnected", Socket.id);
    });
});


app.post('/signup',(req,res)=>{
    UserModel.create(req.body)
    .then(user => res.status(201).json({
            userId: user._id,
            username: user.name,
            email: user.email,
            phone: user.phone, 
    }))
    .catch(err => {
        console.error("Error:", err)
        res.status(400).json(err)})

})

app.post('/login', (req,res)=>{
    const {email, password} = req.body;
    UserModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password===password){
                res.json({
                    message:"Success",
                    userId: user._id,
                    email: user.email,
                    username: user.name,
                    
                })
                
            }
            else{
                res.json({message:"The password is incorrect"})
            }
        }
        else{
            res.json({message:"No recored existed"})
        }
    })
})

server.listen(3000, ()=>{
    console.log("SERVER IS RUNNING");
});