import { Express } from 'express';
import commentsRouter from './comment';
import authRouter from './auth';

const Controller = (app: Express) => {
  app.use('/comments', commentsRouter);
  app.use('/auths', authRouter);
};

export default Controller;
