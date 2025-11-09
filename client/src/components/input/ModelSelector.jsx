"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
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
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    size="sm"
                    className="w-auto min-w-[90px] sm:min-w-[110px] md:min-w-[130px] text-xs sm:text-sm h-8 sm:h-9"
                >
                    <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectGroup>
                        <SelectLabel>Choose a model</SelectLabel>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}