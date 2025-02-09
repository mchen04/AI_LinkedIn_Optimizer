import express from 'express';
import env from '../config/env.js';

const router = express.Router();

router.get('/', (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log('Health check endpoint hit');
    res.json({
      status: 'success',
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      env: env.NODE_ENV
    });
  } catch (error) {
    next(error);
  }
});

export default router;
