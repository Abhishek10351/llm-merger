"use client";

import { api } from "@/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>
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
                        <div className="space-y-2">
                            <label
                                htmlFor="confirm-password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Confirm Password
                            </label>
                            <Input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                                placeholder="Confirm your password"
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
                                    onClick={() => setError(null)}
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
                            Register
                        </Button>
                        <div className="text-center">
                            <p className="text-muted-foreground text-sm">
                                Already have an account?{" "}
                                <Button
                                    variant="link"
                                    asChild
                                    className="p-0 h-auto"
                                >
                                    <a href="/auth/login">Login</a>
                                </Button>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
