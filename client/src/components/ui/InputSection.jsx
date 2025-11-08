import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InputSection({ value, onChange, onSubmit, loading }) {
    const isMultiline = value.length > 100;

    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="flex items-end gap-2 sm:gap-3">
                {isMultiline ? (
                    <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder="Ask me anything..."
                        className="flex-grow resize-none min-h-[2.5rem]"
                        rows={3}
                        maxLength={2000}
                    />
                ) : (
                    <Input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Ask me anything..."
                        className="flex-grow"
                        maxLength={500}
                    />
                )}
                <Button
                    type="submit"
                    disabled={loading || !value.trim()}
                    size="icon"
                    className="shrink-0"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </form>
        </div>
    );
}
