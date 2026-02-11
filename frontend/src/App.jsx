import React from 'react';
import ChatInterface from './components/ChatInterface';
import UploadFile from './components/UploadFile';
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <h1 className='main-title'>RAG </h1>
      <div className='content-container'>
        <UploadFile/>
        <ChatInterface/>
      </div>
    </div>
  );
}

export default App;