import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import avatar2 from '../../../images/avatar2.jpg'

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full text-white bg-[url('https://e1.pxfuel.com/desktop-wallpaper/461/478/desktop-wallpaper-whatsapp-dark-whatsapp-chat.jpg')]">
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

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center text-white">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl text-green-500">
              {authUser.user.fullname}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone from your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
