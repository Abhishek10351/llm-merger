"use client";
import api from "@/app/api";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { login } from "@/app/store/authSlice";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        api.get("/accounts/me/")
            .then((res) => {
                const user = res.data;
                const data = { user: user };
                dispatch(login(data));
            })
            .catch((err) => {});
    }, [dispatch]);

    return <>{children}</>;
}
