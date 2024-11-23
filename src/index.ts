import swaggerUi from 'swagger-ui-express';

import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { createRoutes } from './routes/index';
import ormConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';


const start = async () => {
  try {
    const orm = await MikroORM.init(ormConfig);
    const em = orm.em.fork(); // Використовуйте fork для роботи з окремими запитами

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(bodyParser.json());

    // Додайте маршрути
    app.use(createRoutes(em));

    app.get('/', (req, res) => {
      res.send('CinemaApp API');
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.listen(PORT, () => {
      console.log(`Сервер запущено на порті ${PORT}`);
    });

    // Залишайте ORM відкритим для роботи сервера
  } catch (error) {
    console.error('Помилка запуску сервера:', error);
  }
};

start();

const swaggerOptions = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "CinemaApp API",
    "description": "API документація для CinemaApp"
  },
  "host": "localhost:3000",
  "basePath": "/api",
  "schemes": ["http"],
  "paths": {
    "/movies": {
      "post": {
        "summary": "Створити новий фільм",
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Фільм для створення",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Movie"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Фільм створено"
          }
        }
      },
      "get": {
        "summary": "Отримати всі фільми",
        "responses": {
          "200": {
            "description": "Список фільмів"
          }
        }
      }
    },
    "/movies/{id}": {
      "get": {
        "summary": "Отримати фільм за ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Фільм знайдено"
          },
          "404": {
            "description": "Фільм не знайдено"
          }
        }
      },
      "put": {
        "summary": "Оновити фільм",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Фільм для оновлення",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Movie"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Фільм оновлено"
          },
          "404": {
            "description": "Фільм не знайдено"
          }
        }
      },
      "delete": {
        "summary": "Видалити фільм",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "integer"
          }
        ],
        "responses": {
          "200": {
            "description": "Фільм видалено"
          },
          "404": {
            "description": "Фільм не знайдено"
          }
        }
      }
    },
    "/movies-with-halls": {
      "get": {
        "summary": "Отримати фільми з назвами залів",
        "responses": {
          "200": {
            "description": "Список фільмів з залами"
          }
        }
      }
    },
    "/movies/filter": {
      "get": {
        "summary": "Отримати фільми з фільтрацією",
        "parameters": [
          {
            "name": "genre",
            "in": "query",
            "required": true,
            "type": "string"
          },
          {
            "name": "minRating",
            "in": "query",
            "required": false,
            "type": "number"
          }
        ],
        "responses": {
          "200": {
            "description": "Список фільтрованих фільмів"
          }
        }
      }
    },
    "/movies/average-rating": {
      "get": {
        "summary": "Отримати середній рейтинг за жанрами",
        "responses": {
          "200": {
            "description": "Середній рейтинг за жанрами"
          }
        }
      }
    }
  },
  "definitions": {
    "Movie": {
      "type": "object",
      "required": ["Title"],
      "properties": {
        "Title": {
          "type": "string"
        },
        "Genre": {
          "type": "string"
        },
        "Duration": {
          "type": "integer"
        },
        "Rating": {
          "type": "number",
          "format": "float"
        }
      }
    }
  }
}

