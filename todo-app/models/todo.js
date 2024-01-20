// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
    
//     static associate(models) {
//       // define association here
//     }
//     static addTodo({ title, dueDate }) {
//       return this.create({ title: title, dueDate: dueDate, completed: false })
//     }

//     static getTodos(){
//       return this.findAll();
//     }

//     markAsCompleted() {
//       return this.update({ completed: true })
//     }
//   }
//   Todo.init({
//     title: DataTypes.STRING,
//     dueDate: DataTypes.DATEONLY,
//     completed: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Todo',
//   });
//   return Todo;
// };





// "use strict";
// const { Model, DataTypes, Op } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }

//     static addTodo({ title, dueDate }) {
//       return this.create({ title: title, dueDate: dueDate, completed: false });
//     }

//     markAsCompleted() {
//       return this.update({ completed: true });
//     }

//     static async getOverdueTodos() {
//       try {
//         const overdueTodos = await Todo.findAll({
//           where: {
//             dueDate: {
//               [Op.lt]: new Date(),
//             },
//           },
//         });
//         return overdueTodos;
//       } catch (error) {
//         console.error('Error getting overdue todos:', error);
//         throw error;
//       }
//     }

//     static async getDueTodayTodos() {
//       try {
//         const dueTodayTodos = await Todo.findAll({
//           where: {
//             dueDate: {
//               [Op.between]: [new Date(), new Date(new Date().setHours(23, 59, 59, 999))],
//             },
//           },
//         });
//         return dueTodayTodos;
//       } catch (error) {
//         console.error('Error getting due today todos:', error);
//         throw error;
//       }
//     }

//     static async getDueLaterTodos() {
//       try {
//         const dueLaterTodos = await Todo.findAll({
//           where: {
//             dueDate: {
//               [Op.gt]: new Date(),
//             },
//           },
//         });
//         return dueLaterTodos;
//       } catch (error) {
//         console.error('Error getting due later todos:', error);
//         throw error;
//       }
//     }

//     static async getTodos() {
//       const todos = await Todo.findAll();
//       return todos;
//     }
//   }
//   Todo.init(
//     {
//       title: DataTypes.STRING,
//       dueDate: DataTypes.DATEONLY,
//       completed: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "Todo",
//     },
//   );
//   return Todo;
// };





"use strict";

const { Model, DataTypes, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // Helper method for defining associations.
    // This method is not a part of Sequelize lifecycle.
    // The `models/index` file will call this method automatically.
    static associate(models) {
      // Define associations here if needed.
    }

    // Method to add a new todo
    static addTodo({ title, dueDate }) {
      return this.create({ title, dueDate, completed: false });
    }

    // Method to mark a todo as completed
    markAsCompleted() {
      return this.update({ completed: true });
    }

    // Method to get overdue todos
    static async getOverdueTodos() {
      try {
        const overdueTodos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date(),
            },
          },
        });
        return overdueTodos;
      } catch (error) {
        console.error('Error getting overdue todos:', error);
        throw error;
      }
    }

    // Method to get todos due today
    static async getDueTodayTodos() {
      try {
        const dueTodayTodos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.between]: [new Date(), new Date(new Date().setHours(23, 59, 59, 999))],
            },
          },
        });
        return dueTodayTodos;
      } catch (error) {
        console.error('Error getting due today todos:', error);
        throw error;
      }
    }

    // Method to get todos due later
    static async getDueLaterTodos() {
      try {
        const dueLaterTodos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date(),
            },
          },
        });
        return dueLaterTodos;
      } catch (error) {
        console.error('Error getting due later todos:', error);
        throw error;
      }
    }

    // Method to get all todos
    static async getTodos() {
      const todos = await Todo.findAll();
      return todos;
    }
  }

  // Initialize the Todo model
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
