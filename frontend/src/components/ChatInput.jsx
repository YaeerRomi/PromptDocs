import { useState } from "react"


function ChatInput({handleSend, disabled}) {
    const [query, setQuery] = useState('');

    const onSubmit = (event) => {
        e.preventDefault();
        handleSend(query)
        setQuery("");
    }

    return(
        <form className="chat-input-wrapper"  onSubmit={onSubmit}>
            <input
                className="chat-input-field"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything..."/>

                <button 
                    type="submit" 
                    className="chat-send-button"
                    disabled={disabled}
                    >Send</button>
        </form>
    );
}

export default ChatInput