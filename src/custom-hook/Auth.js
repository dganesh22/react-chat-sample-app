import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'


// useAuth is custom hook of AuthContext
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth