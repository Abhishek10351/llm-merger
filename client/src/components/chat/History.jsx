"use client";

import HistoryButton from "./HistoryButton";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function History() {
    const { conversations } = useSelector((state) => state.history);
    const [showHistory, setShowHistory] = useState(true);

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={toggleHistory}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer shadow hover:bg-blue-700 transition duration-200"
            >
                {showHistory ? "Hide History" : "Show History"}
            </button>
            {showHistory && (
                <div className="bg-white w-full max-w-md rounded shadow-md p-4 ">
                    <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                        History
                    </h1>
                    <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                        <div className="mb-2 flex flex-col">
                            {conversations.map((message) => (
                                <HistoryButton
                                    key={message.id}
                                    id={message.id}
                                    title={message.title}
                                    onClick={() => {}}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
