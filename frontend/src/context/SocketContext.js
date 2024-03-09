import { createContext, useContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from '../auth/authContext';

export const SocketContext = createContext();


export const SocketProvider = ({children}) => {
  
    const {user} = useContext(AuthContext);

    const { socket, online } = useSocket('http://localhost:3333', user.token);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )


}