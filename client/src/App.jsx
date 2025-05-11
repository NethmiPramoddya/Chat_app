import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:3000");

function App() {
  const [socketId, setSocketId] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] =useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== "")
      socket.emit("join_room", room)
      setShowChat(true)
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
    <div className="flex justify-center items-center min-h-screen">
  {!showChat ? (
    <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center w-80 space-y-4">
      <h3 className="text-2xl font-semibold text-gray-700">Join A Chat</h3>

      <input
        type="text"
        placeholder="john..."
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <input
        type="text"
        placeholder="Room ID"
        onChange={(e) => setRoom(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      <button
        onClick={joinRoom}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Join a Room
      </button>
    </div>
  ) : (
    // showChat content here
    <Chats socket={socket} username={username} room={room} />
  )}
</div>

    </>
  );
}

export default App;
