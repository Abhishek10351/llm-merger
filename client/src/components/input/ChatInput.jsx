import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput({ value, onChange, onSubmit, loading }) {
    // Auto-adjust rows based on content
    const getRows = () => {
        if (!value) return 1;
        const lineBreaks = (value.match(/\n/g) || []).length;
        const estimatedLines = Math.ceil(value.length / 60); // Rough estimate for line wrapping
        const totalLines = Math.max(lineBreaks + 1, estimatedLines);
        return Math.min(Math.max(totalLines, 1), 5); // Min 1, max 5 rows for better mobile experience
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="flex items-end gap-2 sm:gap-3">
                <Textarea
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-grow resize-none !min-h-[2.5rem] max-h-24 sm:max-h-32 md:max-h-40 text-sm sm:text-base !px-2 !py-2 sm:!px-3 sm:!py-2 md:!px-4 md:!py-3 leading-tight sm:leading-normal border-border"
                    rows={getRows()}
                    maxLength={2000}
                />
                <Button
                    type="submit"
                    disabled={loading || !value.trim()}
                    size="icon"
                    className="shrink-0 h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"
                >
                    {loading ? (
                        <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                    ) : (
                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                </Button>
            </form>
        </div>
    );
}