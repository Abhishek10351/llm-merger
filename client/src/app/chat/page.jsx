"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";
import { useDispatch } from "react-redux";
import { addConversation } from "@/store/historySlice";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChatSidebar } from "@/components/chat";
import { ChatInput } from "@/components/ui";

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
        <div className="flex flex-row h-full overflow-hidden">
            {/* ChatSidebar */}
            <ChatSidebar />

            {/* Main Content */}
            <main className="flex-grow flex flex-col bg-gray-50 p-2 sm:p-4">
                <div className="bg-white border rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="border-b p-4 bg-gray-50 rounded-t-lg">
                        <h1 className="text-xl font-semibold text-center text-gray-900">
                            Start a New Conversation
                        </h1>
                        {error && (
                            <p className="mt-2 text-red-600 text-sm text-center">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow min-h-0">
                        <ChatMessages messages={messages} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white">
                        <ChatInput
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSubmit={handleSendMessage}
                            loading={loading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
