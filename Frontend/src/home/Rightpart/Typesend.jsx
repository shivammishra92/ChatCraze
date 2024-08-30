import React, { useState,useEffect } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
import { useTypingContext } from "../../context/TypeContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();
  const {typing,setTyping} = useTypingContext();
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();

  // let otherSideUser = selectedConversation._id;
  //  if(otherSideUser == onlineUsers[0])otherSideUser = onlineUsers[1];

  // console.log(selectedConversation._id)

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
    // setTyping(false);
    socket.emit("typing", { conversationId: selectedConversation._id, typing: false });
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    console.log("Typing event emitted");
    socket.emit("typing", { conversationId: selectedConversation._id, typing: true });
  };

  // const handleInputChange = (e) =>{
  //   setMessage(e.target.value);
  //   // if(onlineUsers.includes(otherSideUser) && !typing)setTyping(true);
  //   if(!typing)setTyping(true);
  // };

  // useEffect(() => {
  //   if (typing) {
  //     const timeout = setTimeout(() => setTyping(false), 5000); // Reset after 1 second
  //     return () => clearTimeout(timeout);
  //   }
  // }, [message]);

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
