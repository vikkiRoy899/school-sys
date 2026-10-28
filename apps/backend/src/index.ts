import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import examRoutes from './routes/exam.routes.js';
import financeRoutes from './routes/finance.routes.js';
import classRoutes from './routes/class.routes.js';
import memoryRoutes from './routes/memory.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'K-12 School Management API Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/finance', financeRoutes);
app.use('/api/v1/classes', classRoutes);
app.use('/api/v1/memory', memoryRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;