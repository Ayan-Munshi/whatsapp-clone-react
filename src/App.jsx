import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Main_chat_room from "./components/Main_chat_room";
import Login from "./components/Login";
import { Context } from "./Context-reducer";



function App() {
  // here we need the (user) to perform conditional renders   // 3

  const { count } = useContext(Context); // 1st we took the count by useContext
  const { user } = count; // then we took (user) which was stored in the (count) in useReducer(file name : Context-reducer)

  
  return (
    <>
      <div id="background" className="h-screen w-screen bg-gray-300 px-5 py-5 ">
        {!user ? (    // if no user then run login component else render the other components as directed
          <Login/>
        ) : (
          
          <div
            id="main wp body"
            className="flex h-[89vh] w-[90vw] shadow-xl rounded-lg bg-white"
          >
            <Router>       {/* <Sidebar> also contains <sidebar-chats> */}
              <Sidebar /> {/* sidebar is here outside because we want it to be rendered as default always **/}
              <Routes>
                <Route
                  path="/rooms/:roomid"
                  element={<> <Main_chat_room />  </>  }
                />
                <Route path="/" element={< Main_chat_room />} />
                {/* Add other routes here if needed */}
              </Routes>
            </Router>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
