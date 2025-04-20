"use client";

import { api } from "@/utils";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@//store/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };

        api.post("/accounts/login/", data)
            .then((res) => {
                const accessToken = res.data.access;
                let decodedToken = jwt.decode(accessToken);
                const currentTime = Date.now();
                const expiresIn = decodedToken.exp * 1000 - currentTime;
                cookies.set("access", accessToken, {
                    expires: new Date(Date.now() + expiresIn),
                });

                router.push("/chat");
            })
            .catch((err) => {
                console.log(err);
                setError(
                    "Login failed. Please check your credentials and try again."
                );
            });

        api.get("accounts/me/")
            .then((res) => {
                const user = res.data;
                dispatch(login({ user }));
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch user data.");
            });

        setTimeout(() => {
            router.push("/");
        }, 2000);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleErrorClose = () => {
        setError(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-slate-500">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
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
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                        <span
                            onClick={handleErrorClose}
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
                    Login
                </button>
                <div className="mt-4">
                    <a
                        className="text-blue-500 hover:text-blue-700"
                        href="/auth/forgot-password"
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>
            <div className="mt-4">
                <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <a
                        href="/auth/register"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
