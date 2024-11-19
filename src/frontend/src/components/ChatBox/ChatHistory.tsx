"use client"
import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatBar from './ChatBar';

interface ChatMessageObject {
    text: string;
    fromBot: boolean;
    index: number;
}

export default function ChatHistory() {

    const [messages, setMessages] = useState<ChatMessageObject[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [addedMessage, setAddedMessage] = useState<ChatMessageObject | null>(null);
    const [uniqueId, setUniqueId] = useState<number>(0);

    function addMessage(text: string, fromBot: boolean)
    {
        const newMessage: ChatMessageObject = { text, fromBot, index: 0 };
        setAddedMessage(newMessage);
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        updateMessages();
    }, [addedMessage]);

    const updateMessages = () => {
        if(addedMessage == null) return;

        addedMessage.index = uniqueId;
        setUniqueId(uniqueId + 1);

        console.log(addedMessage);

        setMessages([...messages, addedMessage]);
        setAddedMessage(null);
    }

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div className="w-[60%] h-[100%] flex flex-col justify-between
            rounded border-2 border-black bg-slate-300">
            <div className="w-[100%] h-full overflow-scroll overflow-x-hidden flex flex-col
                justify-start align-top gap-10 pt-4 px-4 noscrollbar">
                {messages.map((message) => (
                    <ChatMessage key={message.index} text={message.text} fromBot={message.fromBot} />
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <ChatBar sendMessage={addMessage}/>
        </div>
    );
};
