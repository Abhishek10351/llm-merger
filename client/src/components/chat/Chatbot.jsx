"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils";
import { ModelSelector, ChatInput } from "@/components/ui";
import ChatMessages from "./ChatMessages";
import { Card } from "@/components/ui/card";

export default function Chatbot({ chat_id }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedLlm, setSelectedLlm] = useState("gemini_content");

    const fetchChat = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/conversations/${chat_id}/`);
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
        if (chat_id) {
            fetchChat();
        }
    }, [chat_id]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;
        setLoading(true);
        setError(null);

        const newMessage = { user_content: input };
        const currentInput = input;
        setInput("");
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        const data = {
            conversation: chat_id,
            user_content: currentInput,
        };

        try {
            const response = await api.post("/messages/", data);
            const message = response.data;
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop();
                updatedMessages.push(message);
                return updatedMessages;
            });
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message. Please try again.");
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop();
                return updatedMessages;
            });
            setInput(currentInput); // Restore input on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-full overflow-hidden p-0">
            {/* Header with model selector */}
            <div className="border-b px-4 py-3 bg-gray-50">
                <ModelSelector onChange={setSelectedLlm} value={selectedLlm} />
                {error && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
                        {error}
                    </div>
                )}
            </div>

            {/* Messages area */}
            <div className="flex-grow min-h-0">
                {loading && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">
                                Loading conversation...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-full">
                        <ChatMessages
                            messages={messages}
                            selectedLlm={selectedLlm}
                        />
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="border-t p-4 bg-white">
                <ChatInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={handleSendMessage}
                    loading={loading}
                />
            </div>
        </Card>
    );
}
