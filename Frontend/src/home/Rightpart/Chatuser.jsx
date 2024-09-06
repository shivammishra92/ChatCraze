import React,{useState,useEffect} from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import avatar2 from '../../images/avatar2.jpg';
import { useTypingContext } from "../../context/TypeContext.jsx";



function Chatuser() {
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();
  const [typingStatus, setTypingStatus] = useState(false);
  // console.log(selectedConversation._id)

  console.log("Socket:", socket);

  useEffect(() => {
    if (socket){
      console.log("socket found");
      // return;
    }
    console.log(socket.id);//it is the logged in user id
    console.log("Setting up typing listener for conversation:", selectedConversation?._id);
    // Listen for typing events
    socket.on("typing", ({ conversationId, typing }) => {
      console.log(conversationId);
      console.log("Typing event received", typing);
      if (conversationId === selectedConversation?._id) {
        setTypingStatus(typing);
      }
    });

    return () => {
      console.log("Cleaning up typing listener");
      socket.off("typing"); // Cleanup the event listener
    };
  }, [socket, selectedConversation?._id]);

  // const {typing} = useTypingContext();
  // console.log("typing",typing)

  //  let onlineOtherSide = selectedConversation._id;
  //  console.log(onlineUsers);
  //  if(onlineOtherSide === onlineUsers[0])onlineOtherSide = onlineUsers[1];
  //  console.log("current user",selectedConversation._id);
  //  console.log("online other side",onlineOtherSide);

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline";
  };
  const getTypingOrOnlineStatus = () => {
    if (typingStatus === true) return "typing...";
    return getOnlineUsersStatus(selectedConversation._id);
  };

  // const getTypingOrOnlineStatus = (onlineOtherSide) =>{
  //   if(typing)return "typing...";
  //   else if(!typing)return "online";
  //   else return "offline";
  // };
  //console.log(selectedConversation);
  //console.log(onlineUsers);

  
   
  return (
    <div className="ml-0 relative flex items-end h-[8%] justify-start gap-4 bg-slate-800  rounded-sm">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="ml-7 flex space-x-3 items-center justify-center h-[8vh] bg-gray-800">
        {/* <div className={`avatar online`}> */}
        <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id)}`}>

          <div className="w-16 rounded-full">
            <img src={avatar2} />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getTypingOrOnlineStatus()}
            {/* {getOnlineUsersStatus(selectedConversation._id)} */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
