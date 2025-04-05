import { Chatbot } from "@/app/components/chat";

export default function ChatPage({ params }) {
    const chatId = params["chat-id"];
    return (
        <div className="flex flex-col h-full w-full">
            <div className="bg-gray-800 text-white p-4 text-center font-bold text-lg">
                Chat ID: {chatId}
            </div>
            <Chatbot />
        </div>
    );
}
