"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";

export default function ChatHomePage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setMessages([input]);
        setError(null);
        const data = { user_content: input };

        api.post("/new_conversation/", data)
            .then((response) => {
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
        <div className="flex flex-col items-center min-h-[calc(100vh-100px)] bg-gray-100">
            <div className="bg-white w-full rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    Start a New Conversation
                </h1>
                <div className="h-[calc(100vh-250px)] flex overflow-y-auto border rounded bg-purple-300">
                    {loading && (
                        <div className="mb-2 flex flex-col">
                            <div className="px-4 py-2 mb-2 rounded-lg self-end bg-gray-500 w-[300px] text-white">
                                {messages[0]}
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={loading}
                        className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700"
                        } text-white font-bold px-4 py-2 rounded-r focus:outline-none`}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}
