"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";
import { useDispatch } from "react-redux";
import { addConversation } from "@/store/historySlice";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChatSidebar } from "@/components/chat";
import { ChatInput } from "@/components/ui";
import { MessageCircle } from "lucide-react";

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
                    <div className="border-b px-4 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Welcome to LLM Merger
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Compare responses from multiple AI models
                            </p>
                        </div>
                        {error && (
                            <div className="mt-3 text-red-600 text-sm text-center bg-red-50 px-3 py-2 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow min-h-0">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center space-y-4 max-w-md">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                        <MessageCircle className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Start Your First Conversation
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Ask a question and see responses
                                            from different AI models side by
                                            side
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <ChatMessages messages={messages} />
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-gray-50/50">
                        <div className="max-w-4xl mx-auto">
                            <ChatInput
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onSubmit={handleSendMessage}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
