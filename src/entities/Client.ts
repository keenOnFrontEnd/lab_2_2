// src/entities/Client.ts
import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Rating } from './Rating.js';
import { Sale } from './Sale.js';
import { Ticket } from './Ticket.js';

@Entity()
export class Client {
  @PrimaryKey()
  clientId!: number;

  @Property({ length: 100 })
  name!: string;

  @Property({ length: 100, unique: true })
  email!: string;

  @OneToMany(() => Ticket, ticket => ticket.client)
  tickets = new Collection<Ticket>(this);

  @OneToMany(() => Rating, rating => rating.client)
  ratings = new Collection<Rating>(this);

  @OneToMany(() => Sale, sale => sale.client)
  sales = new Collection<Sale>(this);
}
