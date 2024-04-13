import React, { useEffect, useRef } from 'react'
import useAuth from '../custom-hook/Auth'
import useChat from '../custom-hook/useChat'

function Message(props) {
    const { currentUser } = useAuth()
    const { data} = useChat()


    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: "smooth" })
    }, [props.msg])

  return (
    <div ref={ref} className={`message ${props.msg.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={ props.msg.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL } alt="" />
            <span>Just Now</span>
        </div>

        <div className="messageContent">
            <p> {props.msg.text} </p>
            {
                props.msg.img && <img src={props.msg.img} alt='' />
            }
        </div>
    </div>
  )
}

export default Message