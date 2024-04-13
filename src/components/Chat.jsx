import React from 'react'
import Input from './Input'
import Messages from './Messages'
import useChat from '../custom-hook/useChat'

function Chat() {
  const { data } = useChat()


  return (
    <div className='card mt-2' style={{ height: '80vh'}}>
        <div className="card-header">
            <h4 className="text-success"> { data.user?.displayName } </h4>
        </div>
        <div className="card-body">
            <Messages/>
        </div>
        <div className="card-footer">
            <Input/>
        </div>
    </div>
  )
}

export default Chat