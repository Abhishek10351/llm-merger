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
            <div className="px-4 py-3 border-b border-border bg-muted/50">
                <h2 className="text-sm font-medium text-foreground">History</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-2">
                {conversations.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-center">
                        <p className="text-sm text-muted-foreground">
                            No conversations yet
                        </p>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
}
