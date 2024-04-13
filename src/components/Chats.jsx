import React, { useEffect, useState } from 'react'
import { doc , onSnapshot } from "firebase/firestore"
import useAuth from '../custom-hook/Auth'
import useChat from "../custom-hook/useChat"
import { db } from '../fireConfig'

function Chats() {
    const [chats,setChats] = useState([])
    
    const { currentUser } = useAuth()

    const { dispatch } = useChat()

    useEffect(() => {
        const getChats = () =>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())``
            })

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    },[currentUser.uid])

    const handleSelect = (i) => {
        dispatch({ type: "CHANGE_USER", payload: i})
    }

  return (
    <div>Chats</div>
  )
}

export default Chats