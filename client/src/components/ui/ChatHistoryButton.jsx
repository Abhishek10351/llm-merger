"use client";
import { useRouter } from "next/navigation";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
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
            className="mb-2 p-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 cursor-pointer transition-colors border"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <span
                    className="text-sm font-medium truncate max-w-[150px] text-gray-900"
                    title={title}
                >
                    {title}
                </span>
                <Menu as="div" className="relative">
                    <MenuButton asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-6 w-6 hover:bg-secondary/50"
                            title="More Options"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                        </Button>
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-36 bg-background border rounded-md shadow-lg z-10 focus:outline-none">
                        <MenuItem>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full justify-start"
                                title="Delete Chat"
                                onClick={handleDelete}
                            >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
