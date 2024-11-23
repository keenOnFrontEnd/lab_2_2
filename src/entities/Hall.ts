// src/entities/Hall.ts
import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Session } from './Session.js';
import { Screening } from './Screening.js';

@Entity()
export class Hall {
  @PrimaryKey()
  hallId!: number;

  @Property({ length: 50 })
  hallName!: string;

  @Property()
  capacity!: number;

  @OneToMany(() => Session, session => session.hall)
  sessions = new Collection<Session>(this);

  @OneToMany(() => Screening, screening => screening.hall)
  screenings = new Collection<Screening>(this);
}
