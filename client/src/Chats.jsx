import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chats({ socket, username, room }) {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); // Changed from string to array for correct .map usage

  // Sends a message and appends it to the message list
  const sendMessage = async () => {
    if (currentMessage !== "") {
      //  Formats time with leading zeros (e.g., 09:05 instead of 9:5)
      const hours = new Date().getHours().toString().padStart(2, '0');
      const minutes = new Date().getMinutes().toString().padStart(2, '0');
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: `${hours}:${minutes}`,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]); // Appends your own message to chat
      setcurrentMessage(""); // Clears input after sending
    }
  };


  //  Listens for incoming messages only once (avoids duplicate events)
  useEffect(() => {
    // First receive chat history
    socket.on("chat_history", (messages) => {
    setMessageList(messages);
    });
    // Then listen for new messages
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
    socket.off("chat_history");
    socket.off("receive_message");
    }
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="px-4 py-2 text-white bg-gray-800 chat-header">
        <p>Live chat</p>
      </div>

      {/*  Chat body scrollable, displays messages */}
      <div className="chat-body h-[335px] border border-gray-800 bg-white p-0 overflow-hidden">
        <ScrollToBottom className="w-full h-full p-2 overflow-x-hidden overflow-y-auto">
                {messageList.map((msg, index) => {
          const isYou = username === msg.author;

          return (
            <div
              key={index}
              className={`w-full flex ${isYou ? 'justify-start' : 'justify-end'} mb-1`}
            >
              <div className="flex flex-col items-start max-w-[70%]"> {/* Ensure content is aligned properly */}
                <div
                  className={`message-content max-w-full min-h-[40px] px-3 py-2 text-white rounded break-words ${
                    isYou ? 'bg-green-600' : 'bg-blue-500'
                  }`}
                >
                  {msg.message}
                </div>
                <div
                  className={`message-meta text-xs mt-1 w-full ${
                    isYou ? 'text-left' : 'text-right'
                  }`}
                >
                  <span className="font-bold">{msg.author}</span>
                  <span className="ml-2">{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}

        </ScrollToBottom>
      </div>

      {/*  Footer with input and send button */}
      <div className="flex h-10 border-t border-gray-800 chat-footer">
        <input
          type="text"
          placeholder="Hey.."
          value={currentMessage} //  Binds input to state
          className="h-full flex-[85%] border-none px-3 text-base outline-none font-sans border-r border-dotted border-gray-400"
          onChange={(e) => setcurrentMessage(e.target.value)} //  Updates currentMessage on typing
          onKeyPress={(e)=>{
            e.key === "Enter" && sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="flex-[15%] grid place-items-center text-[25px] text-gray-400 hover:text-green-600"
        >
          &#9658; {/* Play icon as send button */}
        </button>
      </div>
    </div>
  );
}

export default Chats;
