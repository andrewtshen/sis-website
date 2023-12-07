import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import EditorPage from './pages/EditorPage/Editor';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import AboutPage from './pages/AboutPage/AboutPage';

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
      <Router>
        <Header title="Spectral Imaging System" />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
