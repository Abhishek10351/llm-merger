"use client";
import HistoryButton from "./ChatHistoryButton";
import { useSelector, useDispatch } from "react-redux";
import { removeConversation } from "@/store/historySlice";

export default function History() {
    const { conversations } = useSelector((state) => state.history);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeConversation(id));
    };

    return (
        <div className="h-full flex flex-col">
            <div className="px-4 py-2 border-b">
                <h1 className="text-lg font-semibold text-gray-900">History</h1>
            </div>
            <div className="flex-grow overflow-y-auto p-2">
                <div className="flex flex-col space-y-1">
                    {conversations.map((message) => (
                        <HistoryButton
                            key={message.id}
                            id={message.id}
                            title={message.title}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
