"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ChatInput } from "@/components/ui";

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
                <ChatInput
                    value={input}
                    onChange={(e) => {}}
                    onSubmit={(e) => {}}
                    loading={false}
                />
            </div>
        </div>
    );
}
