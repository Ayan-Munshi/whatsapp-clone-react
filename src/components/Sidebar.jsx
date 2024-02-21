import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdDonutLarge } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { Avatar, IconButton } from "@mui/material";
import Sidebar_chats from "./Sidebar_chats";
import db from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";

function Sidebar() {
  const [Rooms, setRooms] = useState([]);

  
    useEffect(() => {
      
      const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  
      // Cleanup function
      return () => unsubscribe();  // cleanup function
    }, []);
    

  return (
    <div
      id="total sidebar"
      style={{ flex: "0.35" }} /**flex:0.35 actual wp uses */
      className=" flex flex-col "
    >
      <div
        id="side header"
        className="flex justify-between p-2 border-r-[1px] border-black bg-zinc-300"
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
      <div
        id="side searchbar"
        className="flex bg-zinc-300 items-center h-[39px] p-[25px]"
      >
        <div className="flex items-center rounded-xl bg-zinc-200  px-7">
          <GoSearch />
          <input
            type="text"
            placeholder="Enter here...."
            className="px-7 rounded-xl m-2 border-none"
          />
        </div>
      </div>
      <div id="side chats" className=" flex-1 overflow-scroll">
        
        <Sidebar_chats createnewchat /> { /* this one will be constatnt , this is sending addnewchat (word) 
                                        to the <Sidebar_chats> components to get the design for (+ Add New Chat) section*/}

        {Rooms.map((room) => (    // this one is the indivitual chat portion  

          <Sidebar_chats key={room.id} id={room.id} name={room.data.name} />

        ))}
      </div>
    </div>
  );
}

export default Sidebar;
