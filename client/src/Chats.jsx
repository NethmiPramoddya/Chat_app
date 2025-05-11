import { useEffect } from 'react';
import { React ,useState } from 'react'

function Chats({socket, username, room}) {
    const [currentMessage, setcurrentMessage] = useState("");

    const sendMessage = async () =>{
            if (currentMessage !== ""){
                const messageData = {
                    room: room,
                    author: username,
                    message: currentMessage,
                    time: new Date(Date.now()).getHours() + ":" +  new Date(Date.now()).getMinutes(),
                };

                await socket.emit("send_message",messageData)
            } 
    }

    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data);
        })
    },[socket])

  return (
    <div>
        <div className='chat-header'>
            <p>Live chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type="text" placeholder='Hey..' onChange={(e)=>{setcurrentMessage(e.target.value)}} />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chats