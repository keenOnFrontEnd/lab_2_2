// src/entities/Session.ts
import { Entity, PrimaryKey, Property, ManyToOne, Collection, OneToMany } from '@mikro-orm/core';
import { Movie } from './Movie.js';
import { Hall } from './Hall.js';
import { Ticket } from './Ticket.js';

@Entity()
export class Session {
  @PrimaryKey()
  sessionId!: number;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Hall)
  hall!: Hall;

  @Property()
  startTime!: Date;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @OneToMany(() => Ticket, ticket => ticket.session)
  tickets = new Collection<Ticket>(this);
}
