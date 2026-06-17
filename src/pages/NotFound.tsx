import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-red-600 rounded-xl font-semibold text-white hover:bg-red-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
