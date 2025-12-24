"use client";
import { Highlight, themes } from "prism-react-renderer";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const markdownComponents = {
    ul: ({ children }) => (
        <ul className="list-disc pl-8 mb-4 text-foreground">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 text-foreground">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="mb-2 pl-2 text-foreground">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="text-primary font-bold">{children}</strong>
    ),
    p: ({ children }) => (
        <p className="mb-4 text-foreground leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
        <h1 className="text-2xl font-bold mb-4 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-xl font-bold mb-3 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-lg font-bold mb-2 text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 className="text-base font-bold mb-2 text-foreground">{children}</h4>
    ),
    h5: ({ children }) => (
        <h5 className="text-sm font-bold mb-2 text-foreground">{children}</h5>
    ),
    h6: ({ children }) => (
        <h6 className="text-xs font-bold mb-2 text-foreground">{children}</h6>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-4 mb-4 text-muted-foreground italic bg-primary/5 py-2">
            {children}
        </blockquote>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-primary hover:text-primary/80 underline"
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
                    className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-sm font-mono"
                    {...props}
                >
                    {children}
                </code>
            );
        } else if (match) {
            return (
                <div className="relative">
                    <button
                        className="absolute top-2 right-2 p-1 bg-muted-foreground/80 rounded-full hover:bg-muted-foreground cursor-pointer"
                        onClick={handleCopyCode}
                        title="Copy to Clipboard"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-400" />
                        ) : (
                            <Copy className="h-4 w-4 text-background" />
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
                                className="rounded bg-muted border border-border p-4 overflow-x-auto"
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
                className="bg-muted text-muted-foreground rounded px-1 py-0.5 text-sm font-mono"
                {...props}
            >
                {children}
            </code>
        );
    },
    table: ({ children }) => (
        <table className="table-auto border-collapse border border-border w-full text-foreground mb-4">
            {children}
        </table>
    ),
    thead: ({ children }) => (
        <thead className="bg-muted text-foreground">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
        <tr className="border-b border-border">{children}</tr>
    ),
    th: ({ children }) => (
        <th className="px-4 py-2 border border-border text-left font-bold text-foreground">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-4 py-2 border border-border text-foreground">
            {children}
        </td>
    ),
};

export const markdownPlugins = {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
};

export default markdownComponents;