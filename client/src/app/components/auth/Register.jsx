"use client";

import api from "@/app/api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("User");
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("123");
    const [confirmPassword, setConfirmPassword] = useState("123");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const data = {
            name: name,
            email: email,
            password: password,
        };
        api.post("/accounts/users/", data)
            .then((res) => {
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setError("Registration failed. Please try again.");
            });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-slate-500">Register</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="confirm-password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                        <span
                            onClick={() => setError(null)}
                            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
                        >
                            <svg
                                className="fill-current h-6 w-6 text-red-500"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <title>Close</title>
                                <path d="M10 9l5.5 5.5L16.5 16l-5.5-5.5L6.5 16l-.5-.5L10 9z" />
                            </svg>
                        </span>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                >
                    Register
                </button>
                <div className="mt-4">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <a
                            href="/auth/login"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
