import { useRouter } from "next/navigation";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HistoryButton({ id, title }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
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
                    className="ml-2 text-grey-700 cursor-pointer hover:text-gray-900 focus:outline-none border-1 rounded-full p-1 transition duration-200 ease-in-out hover:bg-gray-300"
                    // onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faEllipsisV} size="lg" />
                </button>
            </div>
        </div>
    );
}
