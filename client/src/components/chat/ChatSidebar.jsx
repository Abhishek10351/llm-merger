"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/ui";
import { useRouter } from "next/navigation";
import { Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleNewChat = () => {
        router.push("/chat/");
    };

    return (
        <aside
            className={`${
                isSidebarOpen ? "w-64" : "w-16"
            } bg-white shadow-sm border-r border-gray-200 transition-all duration-300 h-full flex flex-col overflow-hidden shrink-0`}
        >
            {/* Header with toggle */}
            <div className="p-3 border-b flex items-center justify-between min-h-[3.5rem] bg-gray-50/50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="hover:bg-gray-200/50"
                >
                    {isSidebarOpen ? (
                        <X className="h-4 w-4" />
                    ) : (
                        <Menu className="h-4 w-4" />
                    )}
                </Button>
                {isSidebarOpen && (
                    <span className="text-sm font-medium text-gray-700">
                        LLM Merger
                    </span>
                )}
            </div>

            {/* Content */}
            {isSidebarOpen && (
                <>
                    {/* New Chat Button */}
                    <div className="p-3">
                        <Button
                            onClick={handleNewChat}
                            variant="default"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                            size="sm"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Chat
                        </Button>
                    </div>

                    {/* Chat History */}
                    <div className="flex-grow overflow-hidden">
                        <ChatHistory />
                    </div>
                </>
            )}
        </aside>
    );
}
