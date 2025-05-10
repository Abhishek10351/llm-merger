"use client";

import ChatMessages from "./ChatMessages";

export default function ChatMessagesSection({ messages, selectedLlm }) {
    return (
        <div className="flex-grow overflow-y-auto flex flex-col">
            <ChatMessages messages={messages} selectedLlm={selectedLlm} />
        </div>
    );
}
