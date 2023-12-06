import React, { useState, useEffect } from 'react';
import './App.css';

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
      <header className="App-header">
        <p>
          The current time is {currentTime}.
        </p>
      </header>
    </div>
  );
}

export default App;
