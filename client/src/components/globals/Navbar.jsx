"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/login");
    };

    const name = user?.name || "Guest";

    // Generate Dicebear avatar URL
    const dicebearUrl = `https://api.dicebear.com/9.x/fun-emoji/png/?seed=${name}&size=40&backgroundColor=%23f0f0f0`;
    

    return (
        <nav className="flex items-center justify-between bg-gray-800 p-4">
            <div className="flex items-center space-x-4">
                <Image
                    src={dicebearUrl}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="text-white text-xl font-bold">Chatbot</h1>
            </div>
            {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                    <span className="text-white">{name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => router.push("/auth/register")}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                    >
                        Sign Up
                    </button>
                </div>
            )}
        </nav>
    );
}
