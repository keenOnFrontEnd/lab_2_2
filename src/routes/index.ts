// src/routes/index.ts
import { Router } from 'express';
import { createMovieRoutes } from './movieRoutes.js';
// Імпортуйте інші маршрути аналогічно

export const createRoutes = (em: any): Router => {
  const router = Router();

  router.use('/api', createMovieRoutes(em));

  return router;
};
