// src/routes/movieRoutes.ts
import { Router } from 'express';
import { MovieController } from '../controllers/movieController';
import { EntityManager } from '@mikro-orm/core';

export const createMovieRoutes = (em: EntityManager): Router => {
  const router = Router();
  const controller = new MovieController(em);

  // Спеціальні запити
  router.get('/movies-with-halls', controller.getMoviesWithHalls.bind(controller));
  router.get('/movies/filter', controller.getFilteredMovies.bind(controller));
  router.get('/movies/average-rating', controller.getAverageRatingByGenre.bind(controller));

  // CRUD маршрути
  router.post('/movies', controller.create.bind(controller));
  router.get('/movies', controller.getAll.bind(controller));
  router.get('/movies/:id', controller.getById.bind(controller));
  router.put('/movies/:id', controller.update.bind(controller));
  router.delete('/movies/:id', controller.delete.bind(controller));



  return router;
};
