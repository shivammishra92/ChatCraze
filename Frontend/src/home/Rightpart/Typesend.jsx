import React, { useState,useEffect,useCallback } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useTypingContext } from "../../context/TypeContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";


const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const {typing,setTyping} = useTypingContext();
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
    console.log("Typing stopped after message send");
    socket.emit("typing", { conversationId: selectedConversation._id, typing: false });
  };

  // Debounced typing event emitter
  const emitTypingEvent = useCallback(debounce(() => {
    console.log("Typing event emitted");
    socket.emit("typing", { conversationId: selectedConversation._id, typing: true });
  }, 300), [socket, selectedConversation._id]);
  

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (e.target.value !== "") {
      emitTypingEvent();
    } 
    else {
      console.log("Typing stopped as input is cleared");
      socket.emit("typing", { conversationId: selectedConversation._id, typing: false });
    }
  };

  useEffect(() => {
    if (message === "") {
      socket.emit("typing", { conversationId: selectedConversation._id, typing: false });
    }
  }, [message, socket, selectedConversation._id]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh]  bg-gray-800">
        <div className=" w-[93%] mx-4 text-black">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            // onChange={ (e) => setMessage(e.target.value) }
            onChange={handleInputChange}
            className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full"
            />
        </div>
        <button>
          <IoSend className="text-3xl text-white" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
