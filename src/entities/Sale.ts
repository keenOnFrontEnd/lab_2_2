// src/entities/Sale.ts
import { Entity, PrimaryKey, Property, ManyToOne, OneToOne } from '@mikro-orm/core';
import { Screening } from './Screening.js';
import { Client } from './Client.js';
import { Ticket } from './Ticket.js';

@Entity()
export class Sale {
  @PrimaryKey()
  saleId!: number;

  @ManyToOne(() => Screening)
  screening!: Screening;

  @ManyToOne(() => Client)
  client!: Client;

  @OneToOne(() => Ticket)
  ticket!: Ticket;

  @Property()
  saleDate!: Date;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;
}
