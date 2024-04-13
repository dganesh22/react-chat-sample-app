import React, { useState, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore"
import useChat from '../custom-hook/useChat'
import { db } from '../fireConfig'
import Message from './Message'

function Messages() {
  const [messages,setMessages] = useState([])
  const { data} = useChat()

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])

  return (
    <div className="messages">
        {
          messages?.map((item,index) =>{
              return <Message key={index} msg={item} />
          })
        }
    </div>
  )
}

export default Messages