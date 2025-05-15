"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdownStyle, markdownPlugins } from "@/utils";

export default function ChatMessages({ messages, selectedLlm }) {
    return (
        <div className="h-auto overflow-y-scroll border rounded p-4 bg-purple-300 flex-grow">
            <div className="mb-2 flex flex-col">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="px-4 py-2 mb-2 rounded-lg self-end bg-blue-500 w-[400px] text-white">
                            {message["user_content"]}
                        </div>
                        {message[selectedLlm] && (
                            <div className="relative px-4 py-2 mb-2 rounded-lg self-start bg-gray-600 w-[800px] text-white">
                                <ReactMarkdown
                                    components={markdownStyle}
                                    remarkPlugins={[remarkGfm, ...(markdownPlugins.remarkPlugins || [])]}
                                    rehypePlugins={markdownPlugins.rehypePlugins || []}
                                >
                                    {message[selectedLlm]}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
