import { useState } from "react"
import styles from './ChatInput.module.css'


function ChatInput({handleSend, disabled}) {
    const [query, setQuery] = useState('');

    const onSubmit = (event) => {
        e.preventDefault();
        handleSend(query)
        setQuery("");
    }

    return(
        <form className={styles.inputWrapper}  onSubmit={onSubmit}>
            <input
                className={styles.inputField}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything..."/>

                <button 
                    type="submit" 
                    className={styles.sendBtn}
                    disabled={disabled}
                    >Send</button>
        </form>
    );
}

export default ChatInput