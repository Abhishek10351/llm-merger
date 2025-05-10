"use client";

import { ChatInput } from "@/components/ui";

export default function ChatInputSection({
    input,
    setInput,
    handleSendMessage,
    loading,
}) {
    return (
        <div className="sticky bottom-0 bg-gray-100 p-4 border-t">
            <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={handleSendMessage}
                loading={loading}
            />
        </div>
    );
}
