import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();
// it is a hook.
export const useSocketContext = () => {
  return useContext(socketContext);
};

//children -> generic name(jo bhi aa raha usko as it is pass kar do)
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      //backend running at 4005
      const socket = io("http://localhost:4005", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      //receive "getOnlineUsers" from backend that was used in server.js
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } 
    else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>//value me object pass kar rahe hain
      {children}
    </socketContext.Provider>
  );
};
