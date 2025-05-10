"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatHomePage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/chat");
    }, [router]);

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-100px)] bg-gray-100">
            <div className="bg-white w-full rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    Redirecting to Chat...
                </h1>
            </div>
        </div>
    );
}
