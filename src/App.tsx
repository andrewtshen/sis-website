import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from './Editor';
import ImageEditor from './ImageEditor';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log("Time:", fetch('/time').then(res => res.json()))
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <Editor></Editor>
    </div>
  );
}

export default App;
