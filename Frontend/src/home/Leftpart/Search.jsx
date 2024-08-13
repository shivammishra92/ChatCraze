import React, { useState } from "react";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  //console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className=" h-[13vh]">
      <div className="flex text-green-500 px-1 py-0.5 text-2xl font-bold">Chatigo</div>
      <div className="py-2">
        
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2 ">
            <label className=" border-[2px] border-gray-700 bg-slate-900 rounded-2xl p-3 flex items-center gap-2 w-[90%]">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <HiOutlineSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
