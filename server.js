import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
//
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//
import userRoutes from './routes/userRoutes.js';
import postsRoutes from './routes/postsRoutes.js';
//
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
//
app.get('/', (req, res) => res.send('Api is running'));
//
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);
//
app.use(notFound);
app.use(errorHandler);
//
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
