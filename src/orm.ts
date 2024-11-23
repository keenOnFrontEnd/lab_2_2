// src/orm.ts
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

const orm = MikroORM.init(config);

export default orm;
