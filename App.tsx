import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./src/pages/Home'));
const AdminDashboard = lazy(() => import('./src/pages/AdminDashboard'));
const NotFound = lazy(() => import('./src/pages/NotFound'));

const App: React.FC = () => {
  return (
    <Theme appearance="dark" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen bg-black font-sans selection:bg-red-600 selection:text-white">
          <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-4">
                <div className="text-3xl font-bold font-serif tracking-tighter">
                  GYM MANTRA <span className="text-red-600">FITNESS</span>
                </div>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 animate-[loading_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
          />
        </main>
      </Router>
    </Theme>
  );
}

export default App;