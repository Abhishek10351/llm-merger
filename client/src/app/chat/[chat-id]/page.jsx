import { Chatbot, ChatSidebar } from "@/components/chat";

export default async function ChatPage({ params }) {
    const chatId = (await params)["chat-id"];

    return (
        <div className="flex flex-row h-full bg-gray-50 overflow-hidden">
            <ChatSidebar />

            {/* Main Chat Area */}
            <main className="flex-grow bg-gray-50 flex flex-col p-2 sm:p-4">
                <div className="h-full overflow-hidden">
                    <Chatbot chat_id={chatId} />
                </div>
            </main>
        </div>
    );
}
