import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:3000");

function App() {
  const [socketId, setSocketId] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(username !== "" && room !== "")
      socket.emit("join_room", room)
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
      setSocketId(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  }, []);

  return (
    <>
    <h3>Join A Chat</h3>
    <input type="text" placeholder='john...' onChange={(e)=>{setUsername(e.target.value)}} />
    <input type="text" placeholder='Room ID' onChange={(e)=>{setRoom(e.target.value)}}/>
    <button onClick={joinRoom}>Join a Room</button>

    <Chats socket={socket} username={username} room={room}/>
    </>
  );
}

export default App;
