import { Chatbot, ChatSidebar } from "@/components/chat";

export default async function ChatPage({ params }) {
    const chatId = (await params)["chat-id"];

    return (
        <div className="flex flex-row h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
            <ChatSidebar />

            {/* Main Chat Area */}
            <main className="flex-grow bg-gray-50 flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <Chatbot chat_id={chatId} />
                </div>
            </main>
        </div>
    );
}
