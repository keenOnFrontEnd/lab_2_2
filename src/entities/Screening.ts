// src/entities/Screening.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Movie } from './Movie.js';
import { Hall } from './Hall.js';

@Entity()
export class Screening {
  @PrimaryKey()
  screeningId!: number;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Hall)
  hall!: Hall;

  @Property()
  sessionTime!: Date;
}
