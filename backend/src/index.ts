import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config';

const app = express();

app.use(cors({
  origin: config.frontendUrl,
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
