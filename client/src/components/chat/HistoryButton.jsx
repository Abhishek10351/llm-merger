"use client";
import { useRouter } from "next/navigation";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { api } from "@/utils";

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
            className="mb-2 p-2 bg-gray-200 text-slate-500 rounded shadow-sm hover:bg-gray-300 cursor-pointer transition duration-200 ease-in-out"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{title}</span>
                <Menu as="div" className="relative">
                    <MenuButton
                        className="text-gray-700 cursor-pointer hover:text-gray-900 focus:outline-none border-1 outline-none hover:border-current rounded-full p-1 transition duration-200 ease-in-out hover:bg-gray-300"
                        title="More Options"
                    >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    </MenuButton>
                    <MenuItems
                        className="absolute right-0 mt-2 ml-4 w-24 bg-white border rounded shadow-lg z-10 focus:outline-none"
                        anchor={"right"}
                    >
                        <MenuItem>
                            <button
                                className={
                                    "block w-full text-left px-2 py-2 text-sm hover:bg-gray-200 rounded transition duration-200 ease-in-out cursor-pointer text-red-600"
                                }
                                title="Delete Chat"
                                onClick={handleDelete}
                            >
                                <TrashIcon className="h-5 w-5 mr-2 mb-1 inline" />
                                <span>Delete</span>
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
