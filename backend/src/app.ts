import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import contactRouter from './routes/contact';
import authRouter from './routes/auth';
import servicesRouter from './routes/services';
import blogRouter from './routes/blog';
import testimonialsRouter from './routes/testimonials';
import adminRouter from './routes/admin';

import { verifyJwt } from './middleware/authMiddleware';
import logger from './utils/logger';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get('/health', (_req, res) => res.status(200).send('OK'));

app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/blog', blogRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/admin', verifyJwt, adminRouter); // Protected admin routes

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.stack || err.message || err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
