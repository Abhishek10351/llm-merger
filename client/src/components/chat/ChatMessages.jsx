"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { markdownStyle, markdownPlugins } from "@/utils";

export default function ChatMessages({ messages, selectedLlm }) {
    return (
        <div className="h-full overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <div className="px-4 py-2 rounded-lg self-end bg-blue-600 text-white max-w-[80%] md:max-w-[60%]">
                            <p className="text-sm">{message["user_content"]}</p>
                        </div>
                        {message[selectedLlm] && (
                            <div className="px-4 py-3 rounded-lg self-start bg-white text-gray-900 border border-gray-200 shadow-sm max-w-[90%] md:max-w-[80%]">
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        components={markdownStyle}
                                        remarkPlugins={[
                                            remarkGfm,
                                            ...(markdownPlugins.remarkPlugins ||
                                                []),
                                        ]}
                                        rehypePlugins={
                                            markdownPlugins.rehypePlugins || []
                                        }
                                    >
                                        {message[selectedLlm]}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
