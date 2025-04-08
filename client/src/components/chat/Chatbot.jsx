"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils";

export default function Chatbot({ chat_id }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const fetchChat = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await api.get(`/conversations/${chat_id}`);
            if (response.status === 200) {
                setMessages(response.data.messages);
                console.log(response.data);

                setSuccess("Chat fetched successfully!");
            } else {
                setError("Failed to fetch chat.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching the chat.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchChat();
    }, [chat_id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = { user_content: input };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        const data = {
            conversation: chat_id,
            user_content: input,
        };
        api.post("/messages/", data)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });

        setInput("");
    };

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-100px)] bg-gray-100">
            <div className="bg-white w-full rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    Chatbot
                </h1>
                <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                    <div className="mb-2 flex flex-col">
                        {messages.map((message, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="px-4 py-2 mb-2 rounded-lg self-end bg-blue-500 w-[300px] ">
                                    {message["user_content"]}
                                </div>
                                {message["ai_content"] && (
                                    <div className="px-4 py-2 mb-2 rounded-lg self-start bg-emerald-500 w-[500px] ">
                                        {message["ai_content"]}
                                    </div>
                                )}
                            </div>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold cursor-pointer px-4 py-2 rounded-r focus:outline-none"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
