import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io(import.meta.env.VITE_REACT_APP_SOCKET);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
