"use client";

import { api } from "@/utils";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@//store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Login() {
    const router = useRouter();
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Email
                            </label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Password
                            </label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md relative mb-4">
                                <span className="block sm:inline text-sm">
                                    {error}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={handleErrorClose}
                                    className="absolute top-2 right-2 h-6 w-6 text-destructive hover:bg-destructive/20"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Button>
                            </div>
                        )}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <div className="text-center">
                            <Button variant="link" asChild>
                                <a href="/auth/forgot-password">
                                    Forgot Password?
                                </a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="mt-4 text-center">
                <p className="text-muted-foreground text-sm">
                    Don't have an account?{" "}
                    <Button variant="link" asChild className="p-0 h-auto">
                        <a href="/auth/register">Register</a>
                    </Button>
                </p>
            </div>
        </div>
    );
}
