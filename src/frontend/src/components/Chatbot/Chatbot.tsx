'use client'

import ChatBot from "react-chatbotify";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function GetResponse(question: string) {
    try {
        const data = { message: question };

        const res = await fetch(`${API_URL}/queryChatBot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        console.log("User Question:", question);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const responseJson = await res.json();
        return responseJson['message'];
    } catch (err) {
        console.error("Fetch error:", err);
        return "Couldn't connect to server";
    }
}

const Chatbot = () => {
    const flow = {
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
        <ChatBot id={"bot"} flow={flow} />
    );
};

export default Chatbot;
