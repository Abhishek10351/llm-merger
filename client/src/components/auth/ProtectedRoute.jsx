"use client";
import { api } from "@/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";
import { clearHistory, addAllConversations } from "@/store/historySlice";
import MainLayout from "@/components/layout/MainLayout";

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [authChecked, setAuthChecked] = useState(false);

    const isAuthPage = pathname?.startsWith("/auth");

    useEffect(() => {
        // Check authentication status on mount
        api.get("/accounts/me/")
            .then((res) => {
                const user = res.data;
                const data = { user: user };
                dispatch(login(data));
                setAuthChecked(true);

                // If logged in and on auth page, redirect to chat
                if (isAuthPage) {
                    router.push("/chat");
                }
            })
            .catch((err) => {
                setAuthChecked(true);

                // If not logged in and not on auth page, redirect to login
                if (!isAuthPage) {
                    router.push("/auth/login");
                }
            });
    }, [dispatch, router, isAuthPage]);

    useEffect(() => {
        // Load conversations if authenticated
        if (isLoggedIn && authChecked) {
            api.get("/conversations/")
                .then((res) => {
                    const conversations = res.data;
                    if (conversations.length > 0) {
                        dispatch(clearHistory());
                    }
                    dispatch(addAllConversations(conversations));
                })
                .catch(() => {
                    // Silently handle conversation loading errors
                });
        }
    }, [isLoggedIn, authChecked, dispatch]);

    // Show loading while checking auth
    if (!authChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return <MainLayout>{children}</MainLayout>;
}
