import { Express } from 'express';
import commentsRouter from './comment';
import authRouter from './auth';
import userRouter from './user';

const Controller = (app: Express) => {
  app.use('/comments', commentsRouter);
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
};

export default Controller;
