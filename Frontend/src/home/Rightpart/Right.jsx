import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [allUsers, loading] = useGetAllUsers();
  // const { socket, onlineUsers } = useSocketContext();
  // console.log(onlineUsers)
  // if(onlineUsers.length > 1)
  //   console.log("more than one")
  
  // if(allUsers.length > 1)
  // console.log(allUsers[0]._id)

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className={`w-full text-white`}>
      {/* <img src={avatar2} alt="avatar image"/> */}
      <div>
        {!selectedConversation ? (<NoChatSelected /> ) :
         ( <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}>
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

//if no-chat selected then background image will be set to default color
//else it will refer to messages component to display the chat bg-image
const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative bg-slate-800">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center text-white">
          <h1 className="text-center">
            Hey!! {" "}
            <span className="font-semibold text-xl text-green-500">
              {authUser.user.fullname}
            </span>
            <br />
            Start your conversation by selecting anyone from your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
