// src/controllers/movieController.ts
import { Request, Response } from 'express';
import { Movie } from '../entities/Movie';
import { EntityManager } from '@mikro-orm/core';

export class MovieController {
  constructor(private em: EntityManager) {}

  // Створення фільму
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, genre, duration, rating } = req.body;
      const movie = this.em.create(Movie, { title, genre, duration, rating });
      await this.em.persistAndFlush(movie);
      res.status(201).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка створення фільму' });
    }
  }

  // Отримання всіх фільмів
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.em.find(Movie, {});
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка отримання фільмів' });
    }
  }

  // Отримання фільму за ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const movie = await this.em.findOne(Movie, id);
      if (movie) {
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: 'Фільм не знайдено' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка отримання фільму' });
    }
  }

  // Оновлення фільму
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { title, genre, duration, rating } = req.body;
      const movie = await this.em.findOne(Movie, id);
      if (movie) {
        movie.title = title ?? movie.title;
        movie.genre = genre ?? movie.genre;
        movie.duration = duration ?? movie.duration;
        movie.rating = rating ?? movie.rating;
        await this.em.persistAndFlush(movie);
        res.status(200).json(movie);
      } else {
        res.status(404).json({ error: 'Фільм не знайдено' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка оновлення фільму' });
    }
  }

  // Видалення фільму
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const movie = await this.em.findOne(Movie, id);
      if (movie) {
        await this.em.removeAndFlush(movie);
        res.status(200).json({ message: 'Фільм видалено' });
      } else {
        res.status(404).json({ error: 'Фільм не знайдено' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка видалення фільму' });
    }
  }

  // Спеціальні запити

  // 2.2.1. Запит з об’єднанням таблиць (отримати фільми з назвами залів)
  async getMoviesWithHalls(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.em.find(Movie, {}, { populate: ['sessions.hall'] });
      const result = movies.map(movie => ({
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        rating: movie.rating,
        halls: movie.sessions.getItems().map(session => ({
          hallName: session.hall.hallName,
          startTime: session.startTime,
        })),
      }));
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка отримання даних' });
    }
  }

  // 2.2.2. Запит з фільтрацією (фільми жанру "Action" з рейтингом > 7.0)
  async getFilteredMovies(req: Request, res: Response): Promise<void> {
    try {
      const genre = req.query.genre as string;
      const minRating = parseFloat(req.query.minRating as string) || 0;

      if (!genre) {
        res.status(400).json({ error: 'Потрібно вказати жанр' });
        return;
      }

      const movies = await this.em.find(Movie, { genre, rating: { $gt: minRating } });
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка отримання фільтрованих фільмів' });
    }
  }

  // 2.2.3. Запит з агрегатними функціями (середній рейтинг за жанрами)
  async getAverageRatingByGenre(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.em.getConnection().execute(`
        SELECT Genre, AVG(Rating) AS AverageRating
        FROM Movies
        GROUP BY Genre
      `);
      res.status(200).json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Помилка отримання агрегованих даних' });
    }
  }
}
