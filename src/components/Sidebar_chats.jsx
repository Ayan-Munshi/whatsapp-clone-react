import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { onSnapshot,query,orderBy } from "firebase/firestore";


function Sidebar_chats({ id, name, createnewchat }) {  // arguments comins from <Side_bar> component
  const [seedval, setseedval] = useState(""); // avatar
  const [message,setmessage] = useState("") // to code the last message section in every chat
  const roomid = useParams.roomid 

  useEffect(() => {
    setseedval(
      Math.floor(Math.random() * 300) // this calculation is  for random avatar
    );
  }, []);

  useEffect(() => {   // doing for the last message on every chat    
      if(id){
      // Fetching the  messages section from the database
      const messageDBpath = collection(db, 'rooms', id, 'messages');       // path of the message section(messages is the subcollection in Db which has message field)
      const messageOrder = query(messageDBpath, orderBy('timestamp', 'desc'));  // sorting the messages in descending order

      const unsubscribeMessages = onSnapshot(messageOrder, (snapshot) => {   // using the onSnapshot function of firebase to capture the current situation in that section (its more like a screenshot)
        setmessage(snapshot.docs.map((doc) => doc.data()));     // pouring the data in to a variable to use further(setMessage)
      });
      
      return () => {
        unsubscribeMessages(); // cleanup messages subscription
      };                      
    }}
  , []);

  const add_new_chat = () => {
    const chatroomname = prompt("Enter new chat room name");
           // If you don't mark the function as async, JavaScript won't wait for the asynchronous operation (like adding a document to Firestore) 
           // to complete before moving on to the next line of code. This means that other parts of your code might execute before the Firestore operation finishes.

    if (chatroomname) {
      async function addChatRoom() {
        try {
          const docRef = await addDoc(collection(db, "rooms"), {
            name: chatroomname,
          });
          console.log("Document written with ID: ", docRef.id); // (this is the id of that newly created room) if the code runs with no error then this(debug perpose)
        } catch (e) {
          console.error("Error adding add new chat in DB: ", e); //e is the could be error
        }
      }

      addChatRoom(); // Invoking the function
    }
  };

  return !createnewchat ? (    // if this does not receives createnewchat (word) from <Sidebar> component then this section will design chat rooms else design + Add New Chat section
    <Link to={`/rooms/${id}`}>
    <div className="flex p-2 cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300">
      <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${seedval}`} />{" "}
      {/* ...link of random avatar */}
      <div id="room name and info" className="m-2">
        <h2>{name}</h2>
        <p className="text-[10px] ">{message[0]?.message}....</p>  {/*last message*/}
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={add_new_chat}>
      <h2 className=" font-bold p-4  cursor-pointer  border-gray-400 border-b-[0.2px] hover:bg-gray-300 ">
        + Add New chat
      </h2>
    </div>
    
  );
}

export default Sidebar_chats;
