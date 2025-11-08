"use client";
import { useRouter } from "next/navigation";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { Trash2, MoreHorizontal, MessageCircle } from "lucide-react";
import { api } from "@/utils";
import { Button } from "@/components/ui/button";

export default function HistoryButton({ id, title, onDelete }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
        router.push(`/chat/${id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await api.delete(`/conversations/${id}/`);
            onDelete(id);
            router.push("/chat/");
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    return (
        <div
            key={id}
            className="group p-2 bg-white hover:bg-gray-50 text-gray-900 rounded-lg cursor-pointer transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <MessageCircle className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span
                        className="text-sm text-gray-700 truncate"
                        title={title}
                    >
                        {title}
                    </span>
                </div>
                <Menu as="div" className="relative">
                    <MenuButton asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                            title="More Options"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-1 w-32 bg-white border rounded-lg shadow-lg z-50 focus:outline-none py-1">
                        <MenuItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Delete Chat"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-3.5 w-3.5 mr-2" />
                                Delete
                            </Button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
