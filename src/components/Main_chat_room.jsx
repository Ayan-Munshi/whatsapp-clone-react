import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { IoCall } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { collection,onSnapshot,query,orderBy,doc,addDoc,serverTimestamp } from "firebase/firestore";
import './Main_chat_room.css'
import {nanoid} from 'nanoid'
import { Context } from "../Context-reducer";

function Main_chat_room() {
 
  const[inputvalue,setinputvalue] = useState(" ")
  const[roomname,setroomname] = useState("")
  const roomid = useParams().roomid //adding useparam on roomid
  const [message,setmessage] = useState([])
  const {count} = useContext(Context)
  const {user} = count
  

  useEffect(() => {
    if (roomid) {
      // Fetching room name from db
      const unsubscribeRoom = onSnapshot(doc(db, 'rooms', roomid), (snapshot) => {   // according to the room ids which were automatically generated in firebase db at the time of creating the seperate rooms
        if (snapshot.exists()) {    // if rooms exists then
          setroomname(snapshot.data().name);
        }
      });

      // Fetching the  messages section from the database
      const messageDBpath = collection(db, 'rooms', roomid, 'messages');    // path of the message section(messages is the collection in Db which has sender_name,message,timestamp fields)
      const messageOrder = query(messageDBpath, orderBy('timestamp', 'asc'));  // sorting the messages in ascending order

      const unsubscribeMessages = onSnapshot(messageOrder, (snapshot) => {   // using the onSnapshot function of firebase to capture the current situation in that section (its more like a screenshot)
        setmessage(snapshot.docs.map((doc) => doc.data()));     // pouring the data in to a variable to use further(setMessage)
      });

      return () => {
        unsubscribeRoom();      // cleanup room subscription
        unsubscribeMessages(); // cleanup messages subscription
      };                      // above cleanup functions are diff names because in 1 useEffect there cant be  another same named cleanup function
    }
  }, [roomid]);


 
  const input_handler = (e) => {   // for the onchange in the input section
       
       setinputvalue(e.target.value)

  }

  const onclickhandler = (e) =>{    // for the onclick in the submit button
    e.preventDefault()

    console.log(inputvalue)

    try{ const roompath = doc(db,'rooms',roomid)
    const messageCollectionpath = collection(roompath,'messages')
     addDoc(messageCollectionpath,{
      sender_name: user.displayName,
      message : inputvalue,
      timestamp: serverTimestamp()
     }) }
    catch(error){
      alert(`faceing error to add message details in DB ${error}`)
    }

    setinputvalue("")
  }

  return (
    <div
      id="main chat"
      style={{ flex: "0.65" }}
      className=" flex flex-col rounded-e-lg overflow-scroll"
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
      <div id="chat body" className="flex-1 bg-orange-100 p-5 overflow-auto ">
      {message.map((msg)=>{    // mapping values of message variable coming which is from DB
       
       return( 
        <div key={nanoid()}> {/** giving unique ids for every mapped item */}
         <p className={msg.sender_name === user.displayName ? "receiver-message" : "sender-message"}>   {/*means if a specific condition is true then access reciever-message or access sender-nessage*/}
    
           <span
            id="message producers name"
            className="text-[10px] absolute top-[-15px] font-bold text-black"
           >
            {msg.sender_name}    {/** i called it sender_name coz in DB collection i also set the field name called sender_name */}
           </span>
          
           {msg.message}   {/** msg is the data from DB through map function,(message is the field name i set on the DB)  */}

           <span id="massage time" className="ml-2 text-[9px]">

            {new Date(msg.timestamp?.toDate()).toUTCString()} {/** way to write the timestamp format */}

           </span>

          </p>
          <br></br>
        </div> )
        
      })}
        
      

      </div>
      <div
        id="chat footer"
        className=" flex bg-zinc-300 h-[65px] p-5 border-t-[1px]  items-center justify-between "
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
