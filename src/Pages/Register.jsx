import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../fireConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

function Register() {
        const fName  = useRef()
        const fEmail = useRef()
        const fPassword = useRef()

    const [fileData,setFileData] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const readFile = (e) => {
            console.log('files', e.target.files[0])
            setFileData(e.target.files[0])

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let displayName = fName.current.value;
            let email = fEmail.current.value;
            let password = fPassword.current.value;
            let file = fileData

            // create user 
            let res = await createUserWithEmailAndPassword(auth,email,password)

            // create a unique imagename
            let random = Math.floor(Math.random() * 100000)
            let storageRef = ref(storage, `${displayName+random}`)

            // upload a file and create documents 
            await uploadBytesResumable(storageRef,file).then(() => {
                getDownloadURL(storageRef).then(async (url) => {
                    try {
                        // update the profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: url
                        })

                        // store an user information on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: url
                        })

                        // create an empty user chat on firestore
                        await setDoc(doc(db, "userChats", res.user.uid),{})

                        toast.success("User registered successfully")

                        //redirect to home page
                        navigate(`/login`)
                    } catch (error) {
                        toast.error(error)
                        setLoading(false)
                        setFileData(false)
                    }
                }).catch(err => {})
            }).catch(err => {})

        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-sm-12">
                    <div className="card">
                        <div className="card-header bg-dark">
                            <h6 className="display-6 text-center text-success">Register Here</h6>
                        </div>
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" ref={fName} id="name" className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" ref={fEmail} id="email" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" ref={fPassword} id="password" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="file">Choose avatar image</label>
                                    <input type="file" name="file" onChange={readFile} id="file" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Register" disabled={loading} className="btn btn-warning" />
                                    <div className="float-end">
                                        {
                                            loading? <span className="text-secondary">Uploading..Please Wait</span> : null
                                        }
                                        {
                                            loading ? <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : null
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <Link to={`/login`} className="btn btn-link">Already Registered? Login here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register