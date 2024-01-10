import React from 'react'
import Sidebar from './components/Sidebar'


function App() {
  

  return (
   <>
     <div id='background' className=' h-screen  bg-gray-300 px-5 py-5'> 
       <div id='main wp body' className='flex  h-[89vh] w-[90vw] shadow-xl rounded  bg-white'>  
            <Sidebar/>
       </div>
     </div>
      
   </> 
  )
}
  
export default App
