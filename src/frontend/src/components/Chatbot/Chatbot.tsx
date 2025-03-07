'use client'

import ChatBot from "react-chatbotify";
import React from "react";

async function GetResponse(question: string) {
    try {
        const data = { message: question }

        const res = await fetch('http://localhost:5000/queryChatBot', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })

        console.log(question)
        
        // Check if the response is okay (status in the range 200-299)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const responseJson = await res.json();
        
        return responseJson['message'];
    } catch (err) {
        return "Couldn't connect to server"
    }
}

const Chatbot = () => {
    const flow={
        start: {
            message: "Hello, is there anything I can help you with today?",
            path: "main_loop"
        },
        main_loop: {
            message: (params: any) => GetResponse(params.userInput),
            path: "main_loop"
        }
    }

    return (
        <ChatBot id={"bot"} flow={flow}/>
    );
};

export default Chatbot;

