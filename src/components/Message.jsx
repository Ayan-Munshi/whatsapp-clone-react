import React, { useState,useEffect } from 'react'

import { useParams } from 'react-router-dom'
import db from '../firebase'
import { collection,onSnapshot,query,orderBy } from "firebase/firestore";

function Message() {
  const [message,setmessage] = useState([])
  const roomid = useParams().roomid
  useEffect(() =>{
    const messageDBpath = collection(db,'rooms',roomid,'messages',)
    const messageorder = query(messageDBpath,orderBy('timestamp','asc'))

    const unsubscribe = onSnapshot(messageorder,(snapshot) =>{
      setmessage(snapshot.docs.map((doc) => doc.data()
      ))
    })
    return () => unsubscribe()

  },[roomid])
  return (
    <>
    
       
        


    </>
  )
}

export default Message



