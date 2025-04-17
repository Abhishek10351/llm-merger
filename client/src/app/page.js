"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatHomePage() {
    const [input, setInput] = useState("");
    const router = useRouter();
    useEffect(() => {
        router.push("/chat");

    }, []);

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-100px)] bg-gray-100">
            <div className="bg-white w-full rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    Start a New Conversation
                </h1>
                <div className="h-[calc(100vh-250px)] flex overflow-y-auto border rounded bg-purple-300"></div>
                <form className="mt-4 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a title for your conversation..."
                        className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                    <button
                        type="submit"
                        className={`
                            "bg-blue-500 hover:bg-blue-700"
                     text-white font-bold px-4 py-2 rounded-r focus:outline-none`}
                    >
                        Loading
                    </button>
                </form>
            </div>
        </div>
    );
}
