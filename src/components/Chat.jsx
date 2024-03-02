import React from 'react'
import Input from './Input'
import Messages from './Messages'

function Chat() {
  return (
    <div className='card mt-2' style={{ height: '80vh'}}>
        <div className="card-header">
            Chat
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