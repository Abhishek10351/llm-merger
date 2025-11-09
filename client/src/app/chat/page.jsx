"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";
import { useDispatch } from "react-redux";
import { addConversation } from "@/store/historySlice";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChatSidebar } from "@/components/chat";
import { ChatInput } from "@/components/input";
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
            <main className="flex-grow flex flex-col bg-muted p-0 sm:p-1 md:p-2 lg:p-4 min-w-0">
                <div className="bg-background border-0 sm:border border-border rounded-none sm:rounded-lg shadow-none sm:shadow-sm h-full flex flex-col overflow-hidden max-w-full sm:max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <div className="border-b border-border px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-muted/50 to-primary/10">
                        <div className="text-center">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                                Welcome to LLM Merger
                            </h1>
                            <p className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-0">
                                Compare responses from multiple AI models
                            </p>
                        </div>
                        {error && (
                            <div className="mt-3 text-destructive text-sm text-center bg-destructive/10 px-3 py-2 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow min-h-0">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full p-3 sm:p-4">
                                <div className="text-center space-y-3 sm:space-y-4 max-w-sm sm:max-w-lg mx-auto">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                        <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                            Start Your First Conversation
                                        </h3>
                                        <p className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-0">
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
                    <div className="border-t border-border p-2 sm:p-3 md:p-4 bg-muted/50">
                        <div className="max-w-4xl mx-auto px-2 sm:px-1 md:px-0">
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
