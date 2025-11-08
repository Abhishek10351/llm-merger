"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/login");
    };

    const name = "Abhishek";

    // Generate Dicebear avatar URL
    const dicebearUrl = `https://api.dicebear.com/9.x/fun-emoji/png/?size=40&backgroundColor=%23f0f0f0`;

    return (
        <nav className="flex items-center justify-between bg-white border-b shadow-sm p-4">
            <div className="flex items-center space-x-4">
                <Image
                    src={dicebearUrl}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="text-gray-900 text-xl font-bold">Chatbot</h1>
            </div>
            {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">{name}</span>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        size="sm"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => router.push("/auth/login")}
                        variant="outline"
                        size="sm"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => router.push("/auth/register")}
                        variant="default"
                        size="sm"
                    >
                        Sign Up
                    </Button>
                </div>
            )}
        </nav>
    );
}
