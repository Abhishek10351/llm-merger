"use client";

import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function LLMSelect({ onChange, defaultValue }) {
    const options = [
        { value: "gemini_content", label: "Gemini" },
        { value: "deepseek_content", label: "DeepSeek" },
        { value: "merged_content", label: "Merged Response"}
    ];
    return (
        <div className="w-48 max-w-m px-4">
            <div className="relative">
                <Select
                    className={clsx(
                        "mt-3 block w-full appearance-none rounded-lg border-none px-3 py-1.5 text-sm/6 bg-gray-200 text-slate-500",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
                    )}
                    value={defaultValue}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="text-black"
                        >
                            {option.label}
                        </option>
                    ))}
                </Select>
                <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-slate-500 transition-transform duration-200 ease-in-out"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}
