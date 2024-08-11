import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import avatar2 from '../../../images/avatar2.jpg'

function Chatuser({user}) {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
  //const isOnline = onlineUsers.includes(user._id);

  // console.log(selectedConversation.fullname);
  return (
    <div className="ml-0 relative flex items-end h-[8%] justify-start gap-4 bg-slate-800  rounded-sm">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="ml-7 flex space-x-3 items-center justify-center h-[8vh] bg-gray-800">
        {/* <div className={`avatar ${isOnline ? "online" : ""}`}> */}
        <div className={`avatar online`}>
          <div className="w-16 rounded-full">
            <img src={avatar2} />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
