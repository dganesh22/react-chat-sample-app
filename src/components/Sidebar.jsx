import React from 'react'
import Search from './Search'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='card mt-2' style={{ height: '80vh'}}>
        <div className="card-header">
            Users
        </div>
        <div className="card-body">
            <Search/>
            <Chats/>
        </div>
    </div>
  )
}

export default Sidebar