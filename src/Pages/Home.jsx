import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Menu from '../components/Menu'

function Home() {
  return (
    <section id='home'>
        <Menu/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-4 p-2">
                    <Sidebar/>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-8 p-2">
                    <Chat/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home