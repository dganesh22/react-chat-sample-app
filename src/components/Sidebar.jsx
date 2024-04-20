import React from 'react'
import Search from './Sidebar/Search'
import Chats from './Sidebar/Chats'

function Sidebar() {
  return (
    <React.Fragment>
         <div className='card mt-2' style={{ height: '80vh'}}>
            <div className="card-header">
                Users
            </div>
            <div className="card-body">
                <Search/>
                <Chats/>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Sidebar