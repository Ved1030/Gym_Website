import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-3 mb-6">
        <Dumbbell className="h-10 w-10 text-red-500" />
        <span className="text-4xl font-bold tracking-tight">
          <span className="text-red-500">MYTHOS</span>{' '}
          <span className="text-white/80">FITNESS</span>
        </span>
      </div>
      <h1 className="text-6xl font-bold text-center mb-4">
        Transform Your Body
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-lg mb-8">
        Mumbai's premium fitness destination. World-class trainers, state-of-the-art equipment.
      </p>
      <div className="flex gap-4">
        <a
          href="http://localhost:3000"
          className="px-8 py-4 bg-red-600 rounded-xl font-semibold text-white hover:bg-red-700 transition-all"
        >
          Visit Full Site
        </a>
        <Link
          to="/admin"
          className="px-8 py-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-all"
        >
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
