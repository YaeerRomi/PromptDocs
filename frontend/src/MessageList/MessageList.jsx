import React from "react";
import styles from './MessageList.module.css'

function MessageList({ messages, scrollRef }) {
    return(
        <div className={styles.container} ref={scrollRef}>
            {messages.map((m) => (
                <div key={m.id} className={`${styles.msgWrapper} ${styles[m.role]} ${m.isError ? styles.error : ''}`}>
                    <div className={styles.msgBubble}>
                        {m.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList