// const Sequelize = require('sequelize')

// const database = 'todo_db'
// const username = 'postgres'
// const password = '123456'
// const sequelize = new Sequelize(database, username, password, {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false
// })

// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log('Connection has been established succesfully.')
// //   })
// //   .catch((error) => {
// //     console.error('Unable to connect to the database:', error)
// //   })

// const connect = async () => {
//   return sequelize.authenticate()
// }

// module.exports = {
//   connect,
//   sequelize
// }

const Sequelize = require("sequelize");

const database = "todo_db";
const username = "postgres";
const password = "123456";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};