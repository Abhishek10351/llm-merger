"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/globals";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    
    // Auth pages get full-screen layout
    if (pathname?.startsWith('/auth')) {
        return (
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        );
    }
    
    // Regular pages get navbar + content
    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-grow overflow-hidden">
                {children}
            </main>
        </div>
    );
}