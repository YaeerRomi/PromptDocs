import React, {useState, useRef, useEffect} from 'react'
import { chatService } from '../services/api';
import ChatInput from '../ChatInput/ChatInput';
import MessageList from '../MessageList/MessageList';
import styles from './ChatInterface.module.css'


function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sources, setSources] = useState([]);
    const scrollRef = useRef(null);


    const handleSend = async (query) => {
        const userMessage = {role: 'user', content: query, id: Date.now() }
        setMessages((prev) => [...prev, userMessage]);

        setIsLoading(true);

        try {
            const data = await chatService.sendMessage(query);
            const aiMessage = {
                role: 'ai', 
                content: data.answer, 
                id: Date.now() + 1
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setMessages((prev) => [...prev, {
                role: 'ai', 
                content: "Sorry, I lost my connection", 
                isError: true, 
                id: Date.now()
            }
        ]);
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className={styles.container}>
            <MessageList messages={messages}/>

            <ChatInput handleSend={handleSend} disabled={isLoading}/>
        </div>
    );
}

export default ChatInterface

