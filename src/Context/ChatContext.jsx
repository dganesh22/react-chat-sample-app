import React, { createContext, useReducer } from 'react'
import useAuth from '../custom-hook/Auth'

// context instance
export const ChatContext = createContext()


// context provider
function ChatProvider(props) {
  // custom hook to authcontext
  const { currentUser } = useAuth()

  // initial state for chat
const INITIAL_STATE = {
  chatId: "null",
  user: {}
}

// custom reducer for chat
const chatReducer = (state,action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return {
        user: action.payload,
        chatId: 
        currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid: 
          action.payload.uid + currentUser.uid
      }
  
    default:
      return state
  }
}

// reducer
const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }} >
            {
                props.children
            }
    </ChatContext.Provider>
  )
}

export default ChatProvider