import { Chatbot, History } from "@/components/chat";
export default async function ChatPage({ params }) {
    const chatId = (await params)["chat-id"];

    return (
        <div className="flex flex-row min-h-[calc(100vh-64px)] bg-gray-100">
            <aside className="w-1/4 h-[calc(100vh-64px)] bg-white shadow-md border-r overflow-y-auto">
                <div className="h-full">
                    <History />
                </div>
            </aside>
            <main className="flex-grow h-[calc(100vh-64px)] bg-white shadow-md flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <Chatbot chat_id={chatId} />
                </div>
            </main>
        </div>
    );
}
