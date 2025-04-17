"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils";
import ChatMessages from "./ChatMessages";

export default function Chatbot({ chat_id }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChat = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/conversations/${chat_id}`);
            if (response.status === 200) {
                setMessages(response.data.messages);
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
        <div className="flex flex-col h-full">
            {/* Chat Messages Area */}
            <div className="flex-grow overflow-y-auto">
                <ChatMessages messages={messages} />
            </div>

            {/* Input Section */}
            <div className="sticky bottom-0 bg-gray-100 p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex">
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
