import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config';

console.log(`Server starting on port ${config.port}`);

const app = express();

console.log('[CORS] === CORS DEBUG ===');
console.log('[CORS] FRONTEND_URL env value:', process.env.FRONTEND_URL || '(not set)');
console.log('[CORS] Parsed allowed origins:', config.frontendUrl);

app.use((req, _res, next) => {
  console.log('[CORS] Incoming request origin:', req.headers.origin || '(no origin header)');
  console.log('[CORS] Request method:', req.method);
  console.log('[CORS] Request path:', req.path);
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
