import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
        <div className="container">
            <div className="navbar-brand">Chat-App</div>

            <button className="navbar-toggler" data-bs-target="#menu" data-bs-toggle="collapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="menu">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <img src="https://picsum.photos/id/145/200/200" alt="no image" className="img-fluid rounded-circle" height={50} width={50} />
                        <strong className="text-light ps-2 pe-2">Username</strong>
                        <Link className="btn btn-danger btn-sm">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Menu