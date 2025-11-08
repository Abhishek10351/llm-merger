"use client";
import { Highlight, themes } from "prism-react-renderer";
import {
    ClipboardIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const components_style = {
    ul: ({ children }) => (
        <ul className="list-disc pl-8 mb-4 text-gray-800">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 text-gray-800">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="mb-2 pl-2 text-gray-800">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="text-blue-700 font-bold">{children}</strong>
    ),
    p: ({ children }) => (
        <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
        <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-xl font-bold mb-3 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-lg font-bold mb-2 text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-base font-bold mb-2 text-gray-900">{children}</h4>
    ),
    h5: ({ children }) => (
        <h5 className="text-sm font-bold mb-2 text-gray-900">{children}</h5>
    ),
    h6: ({ children }) => (
        <h6 className="text-xs font-bold mb-2 text-gray-900">{children}</h6>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 mb-4 text-gray-700 italic bg-blue-50 py-2">
            {children}
        </blockquote>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
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
                    className="bg-gray-200 text-gray-800 rounded px-1 py-0.5 text-sm font-mono"
                    {...props}
                >
                    {children}
                </code>
            );
        } else if (match) {
            return (
                <div className="relative">
                    <button
                        className="absolute top-2 right-2 p-1 bg-gray-600 rounded-full hover:bg-gray-500 cursor-pointer"
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
                        theme={themes.github}
                    >
                        {({ style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                className="rounded bg-gray-50 border p-4 overflow-x-auto"
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
            <code
                className="bg-gray-200 text-gray-800 rounded px-1 py-0.5 text-sm font-mono"
                {...props}
            >
                {children}
            </code>
        );
    },
    table: ({ children }) => (
        <table className="table-auto border-collapse border border-gray-300 w-full text-gray-800 mb-4">
            {children}
        </table>
    ),
    thead: ({ children }) => (
        <thead className="bg-gray-100 text-gray-900">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
        <tr className="border-b border-gray-200">{children}</tr>
    ),
    th: ({ children }) => (
        <th className="px-4 py-2 border border-gray-300 text-left font-bold text-gray-900">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-2 border border-gray-300 text-gray-800">
            {children}
        </td>
    ),
};

export const markdownPlugins = {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
};

export default components_style;