import React from "react";
import { GoSearch } from "react-icons/go";
import { MdDonutLarge } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { Avatar, IconButton } from "@mui/material";

function Sidebar() {
  return (
    <div id="total sidebar" style={{ flex: "0.35" }} className=" flex flex-col ">    {/**flex:0.35 actual wp uses */}
      <div
        id="side header"
        className="flex justify-between p-2 border-r-[1px] border-black"
      >
        <Avatar />
        <div id="sidebar header right" className="flex justify-between ">
          <IconButton>
            <MdDonutLarge />
          </IconButton>
          <IconButton>
            <MdMessage />
          </IconButton>
          <IconButton>
            <CiMenuKebab />
          </IconButton>
        </div>
      </div>
      <div id="side searchbar" className="flex bg-zinc-300 items-center h-[39px] p-[25px]">
        <div className="flex items-center rounded-xl bg-zinc-200 my-7 px-2">
             <GoSearch /> 
             <input type="text" placeholder="Enter here...." className="px-4 rounded-xl m-2 border-none"/></div>
       
        </div>
      <div id="side chats" className=""> <p>jhf</p> </div>
    </div>
  );
}

export default Sidebar;
