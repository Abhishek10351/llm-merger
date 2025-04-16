import { useRouter } from "next/navigation";

export default function HistoryButton({ id, title, onClick }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
        onClick(id, title);
        router.push(`/chat/${id}`);
    };

    return (
        <div
            key={id}
            className="mb-2 p-2 bg-gray-200 text-slate-500 rounded shadow-sm hover:bg-gray-300 cursor-pointer transition duration-200 ease-in-out"
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{title}</span>
                <button
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={ handleClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 9a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        />
                        <path d="M10.293 3.293a1 1 0 011.414 0l5.5 5.5a1 1 0 010 1.414l-5.5 5.5a1 1 0 01-1.414-1.414L14.086 10H6a1 1 0 110-2h8.086L10.293 4.707a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
