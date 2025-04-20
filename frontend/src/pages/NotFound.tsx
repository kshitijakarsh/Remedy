import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-400">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block text-blue-500 text-lg font-medium py-2 px-4 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
