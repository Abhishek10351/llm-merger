"use client";

import { useState } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message to the chat
        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Simulate bot response
        const botMessage = { sender: "bot", text: `You said: "${input}"` };
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);

        setInput(""); // Clear input field
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">Chatbot</h1>
                <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 flex ${
                                message.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg ${
                                    message.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
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