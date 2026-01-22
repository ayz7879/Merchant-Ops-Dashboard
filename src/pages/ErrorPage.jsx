import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br flex items-center justify-center">
      <div className="bg-slate-900/50 backdrop-blur-xl border p-8 rounded-xl shadow-2xl shadow-black/20 max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Something Went Wrong
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Refresh Page
          </button>

          <Link
            to="/"
            className="w-full block text-center bg-slate-800/50 border border-slate-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700/50 transition-all duration-200"
          >
            Go to Dashboard
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full text-slate-400 hover:text-white text-sm font-medium py-2 border border-slate-700 rounded-lg transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
