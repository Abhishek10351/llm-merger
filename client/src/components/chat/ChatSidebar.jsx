"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/chat";
import { useRouter } from "next/navigation";
import { Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    // Auto-open sidebar on desktop, closed on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleNewChat = () => {
        router.push("/chat/");
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${
                    isSidebarOpen ? "w-64 sm:w-72 md:w-64" : "w-12 sm:w-14 md:w-16"
                } bg-card shadow-sm border-r border-border transition-all duration-300 h-full flex flex-col overflow-hidden shrink-0 
                ${
                    isSidebarOpen
                        ? "fixed md:relative z-50 md:z-auto"
                        : "relative"
                } 
                ${isSidebarOpen ? "left-0 md:left-auto" : ""}`}
            >
                {/* Header with toggle */}
                <div className="p-3 border-b border-border flex items-center justify-between min-h-[3.5rem] bg-muted/50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="hover:bg-accent"
                    >
                        {isSidebarOpen ? (
                            <X className="h-4 w-4" />
                        ) : (
                            <Menu className="h-4 w-4" />
                        )}
                    </Button>
                    {isSidebarOpen && (
                        <span className="text-sm font-medium text-foreground">
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
                                className="w-full shadow-sm"
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
        </>
    );
}
