import React from 'react';
import ChatInterface from './ChatInterface/ChatInterface';
import UploadFile from './UploadFile/UploadFile';

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