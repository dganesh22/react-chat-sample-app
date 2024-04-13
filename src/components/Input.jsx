import React, { useState } from 'react'
import useAuth from '../custom-hook/Auth'
import useChat from '../custom-hook/useChat'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import { db, storage } from '../fireConfig'
import { v4  as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'react-toastify'


function Input() {
    const [text,setText] =  useState("")
    const [img,setImg] = useState(null)

    const { currentUser } = useAuth()
    const { data } = useChat()

    const handleSend = async () => {
        if(img) {
                const storageRef = ref(storage, uuid())
                const uploadTask = uploadBytesResumable(storageRef,img)

                uploadTask.on(err => {
                    // handle error
                    toast.error(err)
                }, () => {
                    // handle success
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        // console.log(url)
                        updateDoc(doc(db, 'chats', data.chatId), {
                           messages: arrayUnion({
                            id: uuid(),
                            text,
                            senderId: currentUser.uid,
                            date: Timestamp.now(),
                            img: url
                           })
                        })
                    })
                })
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }

        // update user chats collection - current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"] : {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })

        // cupdate user chats collection => selected user
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"] : {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })

        // clear chat inputs
        setText("")
        setImg(null)
    }

  return (
    <div className='form-group'>
        <div className="row">
            <div className="col-md-8 col-lg-10 col-sm-8 col-8">
                <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} id="" className="form-control" placeholder='Type your message here' required/>
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                <label htmlFor="file" className='btn btn-warning'>
                        <i className="bi bi-upload"></i>
                </label>
                <input type="file" name="file" id="file" onChange={(e) => setImg(e.target.files[0])} hidden />
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2 col-2">
                <button className="btn btn-success" onClick={handleSend} > <i className="bi bi-send"></i> </button>
            </div>
        </div>
    </div>
  )
}

export default Input