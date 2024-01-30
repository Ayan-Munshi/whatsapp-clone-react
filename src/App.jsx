import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Main_chat_room from './components/Main_chat_room';

function App() {
  return (
    <>
      <div id='background' className='h-screen w-screen bg-gray-300 px-5 py-5'>
        <div
          id='main wp body'
          className='flex h-[89vh] w-[90vw] shadow-xl rounded-lg bg-white'
        >
          <Router>
          <Sidebar /> {/* sidebar is here outside because we want it to be rendered as default always **/}
            <Routes>
              <Route path='/rooms/:roomid' element={<> <Main_chat_room /> </>} />
              <Route path='/' element={<Main_chat_room/>}/>
              {/* Add other routes if needed */}
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
