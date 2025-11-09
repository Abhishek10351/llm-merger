"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/globals";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    
    // Auth pages get full-screen layout
    if (pathname?.startsWith('/auth')) {
        return (
            <div className="min-h-screen bg-muted">
                {children}
            </div>
        );
    }
    
    // Regular pages get navbar + content
    return (
        <div className="h-screen bg-muted flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-grow overflow-hidden min-h-0">
                {children}
            </main>
        </div>
    );
}