"use client";

import { useState } from "react";
import { api } from "@/utils";
const defaultMessages = [
    {
        "user-content": "Hello! How can I assist you today?",
        "bot-content": "Hello! How can I assist you today?",
    },
    {
        "user-content": "What is your name?",
        "bot-content": "I am a chatbot created to help you.",
    },
    {
        "user-content": "Tell me a joke.",
        "bot-content":
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
    {
        "user-content": "What is the capital of France?",
        "bot-content": "The capital of France is Paris.",
    },
    {
        "user-content": "How do I make a cake?",
        "bot-content":
            "To make a cake, you need flour, sugar, eggs, and butter. Mix them together and bake!",
    },
];
export default function Chatbot() {
    const [messages, setMessages] = useState(defaultMessages);
    const [input, setInput] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { "user-content": input };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setTimeout(() => {
            const botResponse = { "bot-content": `Bot: ${input}` };
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                newMessage,
                botResponse,
            ]);
        }, 1000); // 1 second delay

        setInput(""); // Clear input field
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    Chatbot
                </h1>
                <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                    <div className="mb-2 flex flex-col">
                        {messages.map((message, index) => (
                            <>
                                <div className="px-4 py-2 mb-2 flex rounded-lg justify-end bg-blue-500 max-w-[80%] ">
                                    {message["user-content"]}
                                </div>
                                <div className="px-4 py-2 mb-2 rounded-lg justify-start bg-emerald-500">
                                    {message["bot-content"]}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-r focus:outline-none"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
