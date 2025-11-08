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
        <div className="flex flex-col bg-background">
            <div className="w-full">
                <div className="overflow-y-auto p-4">
                    <h1 className="text-lg font-semibold mb-3 text-gray-900">
                        History
                    </h1>
                    <div className="flex flex-col space-y-2">
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
        </div>
    );
}
