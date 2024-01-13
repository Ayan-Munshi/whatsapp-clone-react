import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { GoSearch } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { IoCall } from "react-icons/io5";

function Main_chat_room() {
  return (
    <div id="main chat" style={{ flex: "0.65" }} className=" flex flex-col rounded-e-lg">
      <div
        id="chat header"
        className="flex items-center bg-zinc-300 h-14  shadow p-3 font-bold "
      >
        <Avatar
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${
            Math.random() * 3
          }`}
        />
        <div id="chat information" className="flex-1 p-e-[20px]">
          <h2 className="mx-2">room name</h2>
          <p className="mx-2 text-[11px]">last online...</p>
        </div>
        <div id="chat head icons" className="flex min-w-[90px] justify-between">
          <IconButton>
            <GoSearch />
          </IconButton>
          <IconButton>
            <IoCall />
          </IconButton>
          <IconButton>
            <CiMenuKebab />
          </IconButton>
        </div>
      </div>
      <div id="chat body" className="flex-1 bg-orange-100" >
        <img src="" alt="" />
      </div>
      <div id="chat footer"></div>
    </div>
  );
}

export default Main_chat_room;
