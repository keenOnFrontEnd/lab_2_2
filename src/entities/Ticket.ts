// src/entities/Ticket.ts
import { Entity, PrimaryKey, Property, ManyToOne, OneToOne } from '@mikro-orm/core';
import { Session } from './Session.js';
import { Client } from './Client.js';
import { Sale } from './Sale.js';

@Entity()
export class Ticket {
  @PrimaryKey()
  ticketId!: number;

  @ManyToOne(() => Session)
  session!: Session;

  @ManyToOne(() => Client)
  client!: Client;

  @Property()
  seatNumber!: number;

  @OneToOne(() => Sale, sale => sale.ticket)
  sale?: Sale;
}
