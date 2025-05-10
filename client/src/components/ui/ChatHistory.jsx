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
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white w-full max-w-md rounded shadow-md">
                <div className="overflow-y-auto border rounded p-4 bg-gray-50 mt-3">
                    <h1 className="text-lg font-bold mb-1 text-slate-500 pl-4">
                        History
                    </h1>
                    <div className="mb-2 flex flex-col">
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
