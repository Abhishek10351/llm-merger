"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/ui";
import { useRouter } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
            } bg-white shadow-sm border-r border-gray-200 transition-all duration-300 h-full overflow-hidden`}
        >
            <div className="p-4 border-b flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isSidebarOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </Button>
            </div>
            <div className="h-full flex flex-col">
                {isSidebarOpen && (
                    <>
                        <div className="p-4 border-t">
                            <Button
                                onClick={handleNewChat}
                                variant="default"
                                className="w-full"
                            >
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                New Chat
                            </Button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <ChatHistory />
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
