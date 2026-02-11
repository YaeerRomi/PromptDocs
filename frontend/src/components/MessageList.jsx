import React from "react";

function MessageList({ messages, scrollRef }) {
    return(
        <div className="message-container" ref={scrollRef}>
            {messages.map((m) => (
                <div key={m.id} className={`message-wrapper ${m.role} ${m.isError ? 'eror-msg' : ''}`}>
                    <div className="message-bubble">
                        {m.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList