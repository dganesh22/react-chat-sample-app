import React, { useEffect, useRef } from 'react'
import useAuth from '../../custom-hook/Auth'
import useChat from '../../custom-hook/useChat'
import moment from 'moment'

function Message({ message}) {
    const { currentUser } = useAuth()
    const { data} = useChat()


    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

  return (
    <div
      ref={ref}
      className={`d-flex align-items-center ${message.senderId !== currentUser.uid && "justify-content-start mt-2 mb-2" } ${message.senderId === currentUser.uid && "justify-content-end mt-2 mb-2"}`}
    >
      <main className="d-flex flex-column">
        <div className={`d-flex ${message.senderId !== currentUser.uid && "justify-content-start" } ${message.senderId === currentUser.uid && "justify-content-end"}`}>
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
            style={{ height: '30px', width: '30px' }}
            className='img-fluid rounded-circle'
          />
          <div className="d-flex flex-column ms-2">
            <span style={{ fontSize: '0.7rem', fontWeight: '500', color: '#999' }}>{moment(message.date.toDate()).format('LLL')}</span>
            <p>{message.text}</p>
          </div>
        </div>
        <div className={`d-flex ${message.senderId !== currentUser.uid && "justify-content-start" } ${message.senderId === currentUser.uid && "justify-content-end"}`}>
          {message.img && <img src={message.img} alt="" className='img-fluid rounded' style={{ width: "10%",}}  />}
        </div>
      </main>
    </div>
  )
}

export default Message