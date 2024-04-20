import React, { useEffect, useState } from 'react'
import { doc , onSnapshot } from "firebase/firestore"
import useAuth from '../../custom-hook/Auth'
import useChat from "../../custom-hook/useChat"
import { db } from '../../fireConfig'

function Chats() {
    const [chats,setChats] = useState([])
    
    const { currentUser } = useAuth()
    const { dispatch } = useChat()

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser.uid && getChats();
      }, [currentUser.uid]);
    
      const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
      };

  return (
    <div className="list-group mt-3">
     <div className="list-group-item">
        <h4 className="text-center">Chats</h4>
     </div>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat, index) => (
      <div
        className="list-group-item d-flex"
        key={index}
        onClick={() => handleSelect(chat[1].userInfo)}
        style={{ cursor: 'pointer' }}
      >
        <img src={chat[1]?.userInfo?.photoURL} alt="" className='img-fluid rounded-circle' style={{ height: '40px', width: '40px'}} />
        <div className="userChatInfo ms-3">
          <h5>{chat[1]?.userInfo?.displayName}</h5>
          <p>{chat[1]?.lastMessage?.text}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Chats