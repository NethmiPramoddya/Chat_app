import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Chats from './Chats';

const socket = io("http://localhost:3000");

function generateUniqueId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length })
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('');
}

function RoomId() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [socketId, setSocketId] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [userId, setUserId] = useState('');

  // Redirect if roomId is missing
  useEffect(() => {
    if (!roomId) {
      const newRoom = generateUniqueId(10);
      navigate(`/room/${newRoom}`, { replace: true }); // Important: replace to avoid double render
    } else {
      setRoom(roomId);
    }
  }, [roomId, navigate]);

  // Check login status and get user info
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (!isLoggedIn || isLoggedIn === "false" || !userId) {
      navigate('/login');
    } else {
      setUserId(userId);
      setStoredUsername(username);
    }
  }, [navigate]);

  // Socket connection and room joining
  useEffect(() => {
    if (!room || !storedUsername) return;

    socket.connect();
    socket.emit("join_room", room);
    setShowChat(true);

    socket.on("connect", () => {
      console.log("Connected with ID:", socket.id);
      setSocketId(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [room, storedUsername]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {showChat && (
        <Chats socket={socket} username={storedUsername} room={room} />
      )}
    </div>
  );
}

export default RoomId;
