import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InputSection({ value, onChange, onSubmit, loading }) {
    const isMultiline = value.length > 100;

    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="flex items-end gap-2">
                {isMultiline ? (
                    <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder="Ask me anything..."
                        className="flex-grow resize-none"
                        rows={3}
                    />
                ) : (
                    <Input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Ask me anything..."
                        className="flex-grow"
                    />
                )}
                <Button
                    type="submit"
                    disabled={loading || !value.trim()}
                    size="icon"
                >
                    {loading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="h-4 w-4"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="h-4 w-4"
                        />
                    )}
                </Button>
            </form>
        </div>
    );
}
