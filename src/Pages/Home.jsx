import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Menu from '../components/Menu'

function Home() {
  return (
    <section id='home'>
        <Menu/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12 p-2">
                    <Sidebar/>
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12 p-2">
                    <Chat/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home