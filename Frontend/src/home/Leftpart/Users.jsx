import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
import Chatuser from "../Rightpart/Chatuser";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
 // console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-3 text-xl text-white font-bold bg-slate-700 rounded-md">
        Chats
      </h1>
      <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 10vh)" }}>
        {allUsers.map((user, index) => (
          
          <User key={index} user={user} />
        
        ))}
      </div>
    </div>
  );
}

export default Users;
