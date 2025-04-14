"use client";
import { api } from "@/utils";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { login } from "@//store/authSlice";

import { clearHistory, addAllConversations } from "@/store/historySlice";

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        api.get("/accounts/me/")
            .then((res) => {
                const user = res.data;
                const data = { user: user };
                dispatch(login(data));
            })
            .catch((err) => {});
        api.get("/conversations/")
            .then((res) => {
                const conversations = res.data;
                if (conversations.length > 0) {
                    dispatch(clearHistory());
                }
                dispatch(addAllConversations(conversations));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch]);

    return <>{children}</>;
}
