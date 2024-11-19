"use client"

import { send } from "process";
import { useState } from "react";

interface SendMessageProps {
    sendMessage: (text: string, fromBot: boolean) => void;
}

const ChatBar: React.FC<SendMessageProps> = ({sendMessage}) => {
    const [message, setMessage] = useState<string>('');

    // Form submission handler
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent from reloading page
        
        if(message === '') return;
        sendMessage(message, false);
        setMessage('');

        // TODO: Send to backend and wait for response
        const data = { message: message };
        
        try {
            const res = await fetch('http://localhost:5000/queryChatBot', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
            
            // Check if the response is okay (status in the range 200-299)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const responseJson = await res.json();
            
            sendMessage(responseJson['message'], true);
        } catch (err) {
            console.log(err)
        }
        
    };

    return(
        <div className="p-6 w-[100%] flex items-center justify-center bg-blue-50">
            <form id="form1" className="w-[100%] flex items-center justify-center" onSubmit={handleSubmit}>
                <input type="text" className="w-[60%] rounded-l border-2 border-r-0 text-black border-black pl-1 py-1"
                    onChange={(e) => setMessage(e.target.value)} value={message}/>
                <button type="submit" form="form1" value="Submit" className="rounded-r border-2 border-black bg-white text-black p-1 pr-1.5">Send</button>
            </form> 
        </div> 
    );
};

export default ChatBar;