"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { History } from "@/components/chat";
import { useRouter } from "next/navigation";

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
            } bg-white shadow-md border-r transition-all duration-300 max-h-screen overflow-hidden`}
        >
            <div className="p-4 border-b flex items-center justify-between">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon={isSidebarOpen ? faTimes : faBars}
                        size="lg"
                    />
                </button>
            </div>
            <div className="h-full flex flex-col">
                {isSidebarOpen && (
                    <>
                        <div className="p- border-t self-center">
                            <button
                                onClick={handleNewChat}
                                className="w-ful flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300 cursor-pointer"
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                />
                                {"New Chat"}
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <History />
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
