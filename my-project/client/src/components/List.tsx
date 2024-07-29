import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/messages');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                await axios.post('http://localhost:3001/messages', { message });
                setMessages((prevMessages) => [...prevMessages, message]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.error('Message is required.');
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <div>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))
                ) : (
                    <p>No messages yet.</p>
                )}
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default List;
