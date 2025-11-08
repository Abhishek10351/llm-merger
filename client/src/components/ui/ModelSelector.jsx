"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LLMSelect({ onChange, value }) {
    const options = [
        { value: "gemini_content", label: "Gemini" },
        { value: "deepseek_content", label: "DeepSeek" },
        { value: "merged_content", label: "Merged Response" },
    ];

    return (
        <div className="w-48 px-4">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="mt-3">
                    <SelectValue placeholder="Select model response" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
