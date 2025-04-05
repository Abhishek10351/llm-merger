"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "@/app/store/authSlices";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };

    return (
        <nav className="navbar">
            <h1>Ask ME</h1>
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <>
                        <span className="text-slate-500">Welcome, {user.name}</span>
                        <button onClick={handleLogout} className="btn ">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login" className="btn">
                            Login
                        </a>
                        <a href="/signup" className="btn">
                            Sign Up
                        </a>
                    </>
                )}
            </div>
        </nav>
    );
}
