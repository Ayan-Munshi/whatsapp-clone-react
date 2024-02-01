import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Message from "./Message";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { doc , onSnapshot } from "firebase/firestore";

function Main_chat_room() {
 
  const[inputvalue,setinputvalue] = useState(" ")
  const[roomname,setroomname] = useState("")
  const roomid = useParams().roomid //adding useparam on roomid

  useEffect(() => {
    if (roomid) {
      const unsubscribe = onSnapshot(doc(db, 'rooms', roomid), (snapshot) => {      // Cleanup function to unsubscribe when the component unmounts
        if (snapshot.exists()) {
          setroomname(snapshot.data().name);
        }
      });
  
      
      return () => unsubscribe();
    }
  }, [roomid]);
  




  const input_handler = (e) => {   // for the onchange in the input section
       
       setinputvalue(e.target.value)

  }

  const onclickhandler = (e) =>{    // for the onclick in the submit button
    e.preventDefault()
    console.log(inputvalue)
    setinputvalue("")
  }

  return (
    <div
      id="main chat"
      style={{ flex: "0.65" }}
      className=" flex flex-col rounded-e-lg"
    >
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
          <h2 className="mx-2">{roomname}</h2>
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
      <div id="chat body" className="flex-1 bg-orange-100 p-5">
        
           <Message/>   {/* //this is a component */}

      </div>
      <div
        id="chat footer"
        className=" flex bg-zinc-300 h-[65px] p-5 border-t-[1px]  items-center justify-between"
      >
        <IconButton>
          <FaRegSmile />
        </IconButton>
        <form action="submit" className=" flex flex-1">
          <input
            type="text"
            value={inputvalue}
            onChange={input_handler}
            placeholder="Type message here...."
            className=" flex-1 items-center p-2 m-2 border-none rounded-xl"
          />
          <button 
           onClick={onclickhandler} 
           type="submit"  
           className="bg-gray-300 rounded-[50%] ">
            <div id="send button" className="bg-[#25D366] p-2 rounded-[50%] ">
              <IconButton>
                <IoSend />
              </IconButton>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main_chat_room;
