import React from 'react'
import Sidebar from './components/Sidebar'
import Main_chat_room from './components/Main_chat_room'


function App() {
  

  return (
   <>
     <div id='background' className=' h-screen w-screen bg-gray-300 px-5 py-5'> 
       <div id='main wp body' className='flex  h-[89vh] w-[90vw] shadow-xl  rounded-lg  bg-white'>  
            <Sidebar/>
            <Main_chat_room/>
       </div>
     </div>
      
   </> 
  )
}
  
export default App
