require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: '123456',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: '123456',
    database: 'wd-todo-test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};





