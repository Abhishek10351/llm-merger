export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">
                    404 - Not Found
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    The page you are looking for does not exist.
                </p>
                <p className="mt-2 text-lg text-gray-600">
                    Please check the URL or return to the{" "}
                    <a href="/" className="text-blue-500 cursor-pointer">
                        Home Page
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
