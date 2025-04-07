"use client";

const test_history = [
    {
        id: 1,
        title: "Fibonacci",
    },
    {
        id: 2,
        title: "Factorial",
    },
    {
        id: 3,
        title: "Prime Numbers",
    },
    {
        id: 4,
        title: "Sorting Algorithms",
    },
    {
        id: 5,
        title: "Searching Algorithms",
    },
];
export default function History() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md rounded shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-slate-500">
                    History
                </h1>
                <div className="h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                    <div className="mb-2 flex flex-col">
                        {test_history.map((message) => (
                            <div
                                key={message.id}
                                className="mb-2 p-2 bg-gray-200 text-slate-500 rounded shadow-sm hover:bg-gray-300 cursor-pointer transition duration-200 ease-in-out"
                            >
                                {message.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
