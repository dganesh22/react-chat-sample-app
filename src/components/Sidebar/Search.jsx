import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../fireConfig";
import useAuth from "../../custom-hook/Auth";


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <React.Fragment>
      <div className="form-group">
        <div className="input-group">
        <input type="search"   onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)} value={username} className="form-control" placeholder='Search Username' />
        <button onClick={handleSearch} className="btn btn-success"> <i className="bi bi-search"></i> </button>
        </div>
      </div>

      {
        user && (
          <ul className="list-group mt-3" onClick={handleSelect}>
              <li className="list-group-item" style={{cursor: 'pointer'}} >
                  <div className="chat d-flex justify-content-start align-items-center">
                      <img src={user.photoURL} alt=""  width={50} height={50} className="img-fluid rounded-circle" />
                      <div className="chatInfo ms-4">
                          <h4> { user.displayName } </h4>
                      </div>
                  </div>
              </li>
          </ul>
        )
      }
    </React.Fragment>
  )
}

export default Search