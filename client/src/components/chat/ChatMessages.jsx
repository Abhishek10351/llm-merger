"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import markdownComponents, { markdownPlugins } from "@/utils/markdown";

export default function ChatMessages({ messages, selectedLlm }) {
    return (
        <div className="h-full overflow-y-auto p-2 sm:p-4">
            <div className="flex flex-col space-y-3 sm:space-y-4 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <div className="px-3 sm:px-4 py-2 rounded-lg self-end bg-primary text-primary-foreground max-w-[90%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
                            <p className="text-sm">{message["user_content"]}</p>
                        </div>
                        {message[selectedLlm] && (
                            <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg self-start bg-background text-foreground border border-border shadow-sm max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%]">
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        components={markdownComponents}
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
