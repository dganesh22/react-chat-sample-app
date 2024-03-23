import { signOut } from 'firebase/auth'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../fireConfig'
import { toast } from 'react-toastify'
import useAuth from '../custom-hook/Auth'
 

function Menu() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const logOut = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
            await signOut(auth)
            toast.success("Logout successfully")
            navigate(`/login`)
        }
    }

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
                        <img src={currentUser?.photoURL} alt="no image" className="img-fluid rounded-circle" height={50} width={50} />
                        <strong className="text-light ps-2 pe-2"> Welcome, { currentUser?.displayName } </strong>
                        <Link onClick={logOut} className="btn btn-danger btn-sm">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Menu