import dotenv from 'dotenv';
import { Options } from '@mikro-orm/core';
import {MsSqlDriver} from '@mikro-orm/mssql'
import { Movie } from './entities/Movie.js';
import { Hall } from './entities/Hall.js';
import { Session } from './entities/Session.js';
import { Client } from './entities/Client.js';
import { Ticket } from './entities/Ticket.js';
import { Rating } from './entities/Rating.js';
import { Screening } from './entities/Screening.js';
import { Sale } from './entities/Sale.js';

dotenv.config();

const config: Options = {
  entities: [Movie, Hall, Session, Client, Ticket, Rating, Screening, Sale],
  dbName: process.env.DB_DATABASE || 'YourDatabaseName',
  clientUrl: `sqlserver://${process.env.DB_SERVER || 'localhost'};database=${process.env.DB_DATABASE || 'YourDatabaseName'};trustedConnection=true`,
  driver: MsSqlDriver,
  migrations: {
    path: './migrations', // шлях до папки міграцій
  },
  debug: true, // вимкніть у виробничому середовищі
};

export default config;
