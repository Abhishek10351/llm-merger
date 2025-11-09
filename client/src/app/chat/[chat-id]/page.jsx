import { Chatbot, ChatSidebar } from "@/components/chat";

export default async function ChatPage({ params }) {
    const chatId = (await params)["chat-id"];

    return (
        <div className="flex flex-row h-full bg-muted overflow-hidden">
            <ChatSidebar />

            {/* Main Chat Area */}
            <main className="flex-grow bg-muted flex flex-col p-0 sm:p-1 md:p-2 lg:p-4 min-w-0">
                <div className="h-full overflow-hidden max-w-full sm:max-w-6xl mx-auto w-full">
                    <Chatbot chat_id={chatId} />
                </div>
            </main>
        </div>
    );
}
