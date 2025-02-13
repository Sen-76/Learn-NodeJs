import { Express } from 'express';
import commentsRouter from './comment';

const Controller = (app: Express) => {
  app.use('/comments', commentsRouter);
};

export default Controller;
