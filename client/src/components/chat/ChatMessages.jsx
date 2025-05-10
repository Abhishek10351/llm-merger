"use client";
import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import {
    ClipboardIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const components_style = {
    ul: ({ children }) => (
        <ul className="list-none pl-8 mb-4 text-gray-200">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 text-gray-200">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-2 pl-2">{children}</li>,
    strong: ({ children }) => (
        <strong className="text-violet-400 font-bold">{children}</strong>
    ),
    p: ({ children }) => <p className="mb-4 text-gray-200">{children}</p>,
    code: ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || "");
        const [copied, setCopied] = useState(false);

        const handleCopyCode = () => {
            navigator.clipboard.writeText(children).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        };

        if (inline) {
            return (
                <code
                    className="bg-gray-700 text-gray-200 rounded px-1"
                    {...props}
                >
                    {children}
                </code>
            );
        } else if (match) {
            return (
                <div className="relative">
                    <button
                        className="absolute top-2 right-2 p-1 bg-gray-700 rounded-full hover:bg-gray-500 cursor-pointer"
                        onClick={handleCopyCode}
                        title="Copy to Clipboard"
                    >
                        {copied ? (
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-400" />
                        ) : (
                            <ClipboardIcon className="h-5 w-5 text-white" />
                        )}
                    </button>
                    <Highlight
                        {...props}
                        code={String(children).trim()}
                        language={match[1]}
                        theme={themes.oneDark}
                    >
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className="rounded bg-gray-800 p-4 overflow-x-auto"
                                style={style}
                            >
                                {tokens.map((line, i) => (
                                    <div
                                        key={i}
                                        {...getLineProps({ line, key: i })}
                                    >
                                        {line.map((token, key) => (
                                            <span
                                                key={key}
                                                {...getTokenProps({
                                                    token,
                                                    key,
                                                })}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>
            );
        }
        return (
            <code className="bg-gray-700 text-gray-200 rounded px-1" {...props}>
                {children}
            </code>
        );
    },
};

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
                                <ReactMarkdown components={components_style}>
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
