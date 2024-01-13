import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

function Sidebar_chats({ createnewchat }) {
  const [seedval, setseedval] = useState("");

  useEffect(() => {
    setseedval(
      Math.floor(Math.random() * 300) // this calculation is  for random avatar 
    );
  }, []);

  const add_new_chat = () => {
    const chatroomname = prompt("Enter new chat room name");
  };

  return !createnewchat ? (
    <div className="flex p-2 cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300">
      <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${seedval}`} />     {/* ...link of random avatar */}
      <div id="room name and info" className="m-2">
        <h2>room name</h2>
        <p className="text-[10px] ">information....</p>
      </div>
    </div>
  ) : (
    <div onClick={add_new_chat}>
      <h2 className=" font-bold p-4  cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300 ">
        + Add New chat
      </h2>
    </div>
  );
}

export default Sidebar_chats;
