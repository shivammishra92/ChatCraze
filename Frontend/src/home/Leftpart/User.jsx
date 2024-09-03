import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import avatar2 from '../../images/avatar2.jpg'


export default function User({user}) {
  // console.log((user))
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  // if( isOnline===true)
  //   console.log(user);
  // console.log(isSelected)
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-900" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full ">
            <img src={avatar2} alt="avatar image"/>
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.fullname}</h1>
          {/* <span>{user.email}</span> */}
        </div>
      </div>
    </div>
  );
}

//export default User;
