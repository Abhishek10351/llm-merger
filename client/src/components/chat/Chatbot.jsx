"use client";

import { useState, useEffect } from "react";
import { api } from "@/utils";
import { ModelSelector } from "@/components/ui";
import ChatMessagesSection from "./ChatMessagesSection";
import ChatInputSection from "./ChatInputSection";

export default function Chatbot({ chat_id, blank_chat = false }) {
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
        fetchChat();
    }, [chat_id]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!input.trim()) return;
        setLoading(true);

        const newMessage = { user_content: input };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        const data = {
            conversation: chat_id,
            user_content: input,
        };
        api.post("/messages/", data)
            .then((response) => {
                const message = response.data;
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages.pop();
                    updatedMessages.push(message);
                    return updatedMessages;
                });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error sending message:", error);
            });

        setInput("");
    };

    return (
        <div className="flex flex-col h-full">
            <ModelSelector
                onChange={setSelectedLlm}
                defaultValue={selectedLlm}
            />

            <ChatMessagesSection
                messages={messages}
                selectedLlm={selectedLlm}
            />

            <ChatInputSection
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                loading={loading}
            />
        </div>
    );
}
