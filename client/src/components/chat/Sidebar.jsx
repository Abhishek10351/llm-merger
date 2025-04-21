"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { History } from "@/components/chat";
export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <aside
            className={`${
                isSidebarOpen ? "w-64" : "w-16"
            } bg-white shadow-md border-r transition-all duration-300`}
        >
            <div className="p- border-b flex items-center justify-between">
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
            <div className="h-full">
                {isSidebarOpen && (
                    <div className="">
                        <History />
                    </div>
                )}
            </div>
        </aside>
    );
}
