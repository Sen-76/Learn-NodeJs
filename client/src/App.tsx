import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data: A) => setBackendData(data));
  }, []);

  return (
    <>
      <div className="text-3xl font-bold underline">Hello world!</div>
      {backendData?.map((x) => (
        <div key={x}>{x}</div>
      ))}
    </>
  );
}

export default App;

