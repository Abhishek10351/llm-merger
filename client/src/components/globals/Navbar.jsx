"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "@//store/authSlices";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/login");
    };

    const name = user || "User";

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
            {isLoggedIn && (
                <div className="flex items-center space-x-4">
                    <span className="text-white">{user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
