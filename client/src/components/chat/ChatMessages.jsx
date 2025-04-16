import ReactMarkdown from "react-markdown";
const components_style = {
    ul: ({ children }) => (
        <ul className="list-none pl-8 mb-4 text-gray-200">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-8 mb-4 text-gray-200">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="mb-2 pl-2 before:content-['•'] before:mr-2 before:text-blue-500">
            {children}
        </li>
    ),
};
export default function ChatMessages({ messages }) {
    return (
        <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-5 bg-purple-300">
            <div className="mb-2 flex flex-col">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="px-4 py-2 mb-2 rounded-lg self-end bg-blue-500 w-[300px] text-white">
                            {message["user_content"]}
                        </div>
                        {message["ai_content"] && (
                            <div className="px-4 py-2 mb-2 rounded-lg self-start bg-gray-600 w-[800px] text-white">
                                <ReactMarkdown components={components_style}>
                                    {message["ai_content"]}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
