import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config';

console.log(`Server starting on port ${config.port}`);

const app = express();

const allowedOrigins = config.frontendUrl.split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
