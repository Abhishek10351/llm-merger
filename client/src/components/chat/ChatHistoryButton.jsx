"use client";
import { useRouter } from "next/navigation";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { Trash2, MoreHorizontal, MessageCircle } from "lucide-react";
import { api } from "@/utils";
import { Button } from "@/components/ui/button";

export default function ChatHistoryButton({ id, title, onDelete }) {
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
            className="group p-1.5 sm:p-2 bg-card hover:bg-accent text-card-foreground rounded-lg cursor-pointer transition-all duration-200 border border-border hover:border-border/60 hover:shadow-sm"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground shrink-0" />
                    <span
                        className="text-xs sm:text-sm text-foreground truncate"
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
                            className="h-6 w-6 sm:h-7 sm:w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                            title="More Options"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </Button>
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-1 w-32 bg-popover border border-border rounded-lg shadow-lg z-50 focus:outline-none py-1">
                        <MenuItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
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