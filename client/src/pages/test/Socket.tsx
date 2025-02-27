import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

const Socket = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState<string>('');
  const [responses, setResponses] = useState<string[]>([]);
  const sendMessageToServer = () => {
    if (socket) socket.emit('message', message);
    setMessage('');
  };

  useEffect(() => {
    if (socket) {
      socket.on('response', (data: string) => {
        setResponses((prevResponses) => [...prevResponses, data]);
      });

      return () => {
        socket.off('response');
      };
    }
  }, [socket]);

  return (
    <div>
      <h1>Real-Time Communication with Socket.IO</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
      <button onClick={sendMessageToServer}>Send Message to Server</button>

      <div>
        <h2>Server Response:</h2>
        <div>
          {responses.map((x, index) => (
            <p key={index}>{x}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socket;
