import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/db.js';
import { swaggerSpec } from './config/swagger.js';
import v1Routes from './routes/v1/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ensureAdminFromEnv } from './config/ensureAdmin.js';

const app = express();
const PORT = process.env.PORT || 5001;

const corsOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOrigins = corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: corsOrigins.length ? corsOrigins : corsOrigin, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Try again later.' },
});
app.use('/api', limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', v1Routes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorHandler);

async function start() {
  await connectDB();
  await ensureAdminFromEnv();
  const host = process.env.HOST || '0.0.0.0';
  app.listen(PORT, host, () => {
    console.log(`Server running on http://${host}:${PORT}`);
    console.log(`Swagger: http://${host}:${PORT}/api-docs`);
  });
}

start().catch((err) => {
  console.error('Startup error:', err);
  process.exit(1);
});
