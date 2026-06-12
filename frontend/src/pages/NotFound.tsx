import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 inline-flex items-center gap-2 text-primary hover:underline bg-transparent border-none cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
