import React from 'react'
import  './Message.css'

function Message() {
  return (
    <>
    
       
        <p className={`sender-message ${true && "reciever-message"}`} //means if a specific condition is true then access reciever-message or access sender-nessage
        >

          <span
            id="message producers name"
            className="text-[10px] absolute top-[-15px] font-bold "
          >
            user name
          </span>

          uikgougkiou

          <span id="massage time" className="ml-2 text-[9px]">

            12.00 pm

          </span>

        </p>


         


    </>
  )
}

export default Message



