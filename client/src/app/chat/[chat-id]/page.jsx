
import { Chatbot, ChatSidebar } from "@/components/chat";

export default async function ChatPage({ params }) {
    // const chatId = params["chat-id"];
    const chatId  = (await params)["chat-id"];

    return (
        <div className="flex flex-row h-[calc(100vh-64px)] bg-gray-100 overflow-hidden">
            <ChatSidebar />

            {/* Main Chat Area */}
            <main className="flex-grow bg-white shadow-md flex flex-col">
                <div className="flex-grow overflow-y-auto">
                    <Chatbot chat_id={chatId} />
                </div>
            </main>
        </div>
    );
}
