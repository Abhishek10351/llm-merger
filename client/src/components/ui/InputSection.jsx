import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function InputSection({ value, onChange, onSubmit, loading }) {
    return (
        <div className="sticky bottom-0 bg-gray-100 p-4 border-t">
            <form onSubmit={onSubmit} className="flex items-center h-12">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Ask me anything..."
                    className="flex-grow border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 h-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700"
                    } text-white font-bold px-4 rounded-r focus:outline-none flex items-center justify-center h-full transition duration-200 cursor-pointer ${
                        value.trim() ? "" : "hidden"
                    }`}
                >
                    {loading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="text-white"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="text-white"
                        />
                    )}
                </button>
            </form>
        </div>
    );
}
