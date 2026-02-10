import React, {useState} from 'react'


function ChatInterface() {


    return(
        <div className='chat-container'>
            <div className='message-area'>

            </div>
            <div className='input-area'>
                <input type='text' placeholder='Type a message....'/>

            </div>
        </div>
    );
}

export default ChatInterface

