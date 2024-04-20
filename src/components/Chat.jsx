import React from 'react'
import Input from './Chat/Input'
import Messages from './Chat/Messages'
import useChat from '../custom-hook/useChat'

function Chat() {
  const { data } = useChat()

  return (
    <div className='card mt-2' style={{ height: '80vh'}}>
        <div className="card-header d-flex">
        <img src={data.user?.photoURL} alt="" className='img-fluid rounded-circle' style={{ width: '50px', height: '50px'}} />
            <h4 className="text-success ms-3"> { data.user?.displayName } </h4>
        </div>
        <div className="card-body w-100" style={{ height: '100vh', overflowY: 'auto'}}>
            <Messages/>
        </div>
        <div className="card-footer">
            <Input/>
        </div>
    </div>
  )
}

export default Chat