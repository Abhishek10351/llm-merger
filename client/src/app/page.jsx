"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/chat");
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    LLM Merger
                </h1>
                <p className="text-gray-600">Redirecting to chat...</p>
            </div>
        </div>
    );
}
