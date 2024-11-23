// src/entities/Rating.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Movie } from './Movie.js';
import { Client } from './Client.js';

@Entity()
export class Rating {
  @PrimaryKey()
  ratingId!: number;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Client)
  client!: Client;

  @Property()
  rating!: number; // Перевірка діапазону від 1 до 10 може бути реалізована через валідатори або логіку бізнесу
}
