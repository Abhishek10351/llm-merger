import { Chatbot, History } from "@/components/chat";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-row w-full h-screen">
                <div className="w-1/4 bg-gray-200 p-4">
                    <History />
                </div>
                <div className="w-3/4 bg-white p-4">
                    <Chatbot />
                </div>
            </div>
        </main>
    );
}
