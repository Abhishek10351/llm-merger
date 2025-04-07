import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ReduxProvider} from "@/providers";
import { ProtectedRoute } from "@/components/auth";
import { Navbar } from "@/components/globals";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Chatbot",
    description: "A LLM powered chatbot",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReduxProvider>
                    <ProtectedRoute>
                        <Navbar />
                        {children}
                    </ProtectedRoute>
                </ReduxProvider>
            </body>
        </html>
    );
}
