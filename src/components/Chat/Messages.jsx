import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { db } from "../../fireConfig";
import Message from "./Message";
import useChat from "../../custom-hook/useChat";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useChat();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
