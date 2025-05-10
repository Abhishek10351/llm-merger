"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";
import { useDispatch } from "react-redux";
import { addConversation } from "@/store/historySlice";
import ChatMessagesSection from "@/components/chat/ChatMessagesSection";
import ChatInputSection from "@/components/chat/ChatInputSection";
import { ChatSidebar } from "@/components/chat";

export default function ChatHomePage() {
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setError(null);
        const data = { user_content: input };
        setMessages([data]);

        api.post("/new_conversation/", data)
            .then((response) => {
                const newData = response.data;
                const newConversation = {
                    id: newData.id,
                    title: newData.title,
                };
                dispatch(addConversation(newConversation));
                router.push(`/chat/${response.data.id}`);
            })
            .catch((error) => {
                console.error("Error creating conversation:", error);
                setError("An error occurred while creating the conversation.");
            })
            .finally(() => {
                setLoading(false);
            });
        setInput("");
    };

    return (
        <div className="flex flex-row">
            {/* ChatSidebar */}
            <ChatSidebar />

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center bg-gray-100">
                <div className="bg-white w-full rounded shadow-md p-4 mt-3 flex-grow overflow-y-auto flex flex-col">
                    <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                        Start a New Conversation
                    </h1>
                        <ChatMessagesSection messages={messages} />
                    <ChatInputSection
                        input={input}
                        setInput={setInput}
                        handleSendMessage={handleSendMessage}
                        loading={loading}
                    />
                    {error && (
                        <p className="mt-4 text-red-500 text-sm">{error}</p>
                    )}
                </div>
            </main>
        </div>
    );
}
