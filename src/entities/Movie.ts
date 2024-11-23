// src/entities/Movie.ts
import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Session } from './Session.js';
import { Rating } from './Rating.js';
import { Screening } from './Screening.js';

@Entity()
export class Movie {
  @PrimaryKey()
  movieId!: number;

  @Property({ length: 100 })
  title!: string;

  @Property({ length: 50, nullable: true })
  genre?: string;

  @Property({ nullable: true })
  duration?: number;

  @Property({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating?: number;

  @OneToMany(() => Session, session => session.movie)
  sessions = new Collection<Session>(this);

  @OneToMany(() => Rating, rating => rating.movie)
  ratings = new Collection<Rating>(this);

  @OneToMany(() => Screening, screening => screening.movie)
  screenings = new Collection<Screening>(this);
}
