import cors from 'cors';
import { Application } from 'express';

export const corsMiddleware = (app: Application) => {
  const corsOptions = {
    optionsSuccessStatus: 200,
    origin: process.env.CORS_ORIGIN || '',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  };
  app.use(cors(corsOptions));
};
