

// 'use strict';
// const { Op } = require('sequelize');
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     static  addTask(params) {
//       return  Todo.create(params);
//     }

//     static async showList() {
//       console.log("My Todo list \n");

//       console.log("Overdue");
//       const overdueList = await Todo.overdue();
//       console.log(Todo.toDisplayableList(overdueList));
//       console.log("\n");

//       console.log("Due Today");
//       const dueTodayList = await Todo.dueToday();
//       console.log(Todo.toDisplayableList(dueTodayList));
//       console.log("\n");

//       console.log("Due Later");
//       const dueLaterList = await Todo.dueLater();
//       console.log(Todo.toDisplayableList(dueLaterList));
//     }

    
//     static async overdue() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.lt]: today
//           }
//         }
//       });
//     }
    

//     static async dueToday() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.gt]:today
//           }
//         }
//         // where: {
//         //   dueDate: today
//         // }
//       });
//     }
   
    

//     static async dueLater() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.gt]: today
//           }
//         }
//       });
//     }

//     static async markAsComplete(id) {
//       const todo = await Todo.findByPk(id);
//       if (todo) {
//         await todo.update({ completed: true });
//         return todo;
//       } else {
//         throw new Error('Todo not found');
//       }
//     }

   
//     displayableString() {
//       let checkbox = this.completed ? "[x]" : "[ ]";
//       let datePart = this.dueDate === new Date().toISOString().split('T')[0] && !this.completed
//         ? ` ${this.dueDate}`
//         : '';
//       return `${this.id}. ${checkbox} ${this.title}${datePart}`;
//     }

//   }

//   Todo.init({
//     title: DataTypes.STRING,
//     dueDate: DataTypes.DATEONLY,
//     completed: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Todo',
//     primaryKey:'id'
//   });

//   Todo.toDisplayableList = (list) => {
//     return list
//       .map((item) => {
//         const datePart = item.dueDate === new Date().toISOString().split('T')[0] ? '' : item.dueDate;
//         return `[${item.completed ? 'x' : ' '}] ${item.title} ${datePart}`;
//       })
//       .join('\n');
//   };
  

//   return Todo;
// };

// model/todo.js

// 'use strict';
// const { Op } = require('sequelize');
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     static  addTask(params) {
//       return  Todo.create(params);
//     }

//     static async showList() {
//       console.log("My Todo list \n");

//       console.log("Overdue");
//       const overdueList = await Todo.overdue();
//       console.log(Todo.toDisplayableList(overdueList));
//       console.log("\n");

//       console.log("Due Today");
//       const dueTodayList = await Todo.dueToday();
//       console.log(Todo.toDisplayableList(dueTodayList));
//       console.log("\n");

//       console.log("Due Later");
//       const dueLaterList = await Todo.dueLater();
//       console.log(Todo.toDisplayableList(dueLaterList));
//     }

    
//     static async overdue() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.lt]: today
//           }
//         }
//       });
//     }
    

//     static async dueToday() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.gt]:today
//           }
//         }
//         // where: {
//         //   dueDate: today
//         // }
//       });
//     }
   
    

//     static async dueLater() {
//       const today = new Date().toISOString().split('T')[0];
//       return await Todo.findAll({
//         where: {
//           completed: false,
//           dueDate: {
//             [Op.gt]: today
//           }
//         }
//       });
//     }

//     static async markAsComplete(id) {
//       const todo = await Todo.findByPk(id);
//       if (todo) {
//         await todo.update({ completed: true });
//         return todo;
//       } else {
//         throw new Error('Todo not found');
//       }
//     }

   
//     displayableString() {
//       let checkbox = this.completed ? "[x]" : "[ ]";
//       let datePart = this.dueDate === new Date().toISOString().split('T')[0] && !this.completed
//         ? ` ${this.dueDate}`
//         : '';
//       return `${this.id}. ${checkbox} ${this.title}${datePart}`;
//     }

//   };

//   Todo.init({
//     title: DataTypes.STRING,
//     dueDate: DataTypes.DATEONLY,
//     completed: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Todo',
//     primaryKey:'id'
//   });

//   Todo.toDisplayableList = (list) => {
//     return list
//       .map((item) => {
//         const datePart = item.dueDate === new Date().toISOString().split('T')[0] ? '' : item.dueDate;
//         return `[${item.completed ? 'x' : ' '}] ${item.title} ${datePart}`;
//       })
//       .join('\n');
//   };
  

//   return Todo;
// };



// new?

// "use strict";
// const { Model } = require("sequelize");
// const { Op } = require("sequelize");

// let today = new Date();
// let tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 1);

// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     static async addTask(params) {
//       return await Todo.create(params);
//     }

//     static async showList() {
//       console.log("My Todo list \n");

//       console.log("Overdue");
//       const overdueItems = await Todo.overdue();
//       let todolist1 = overdueItems
//         .map((todo) => todo.displayableString())
//         .join("\n");
//       console.log(todolist1);
//       console.log("\n");

//       console.log("Due Today");
//       const dueTodayItems = await Todo.dueToday();
//       let todolist2 = dueTodayItems
//         .map((todo) => todo.displayableString())
//         .join("\n");
//       console.log(todolist2);

//       console.log("\n");

//       console.log("Due Later");
//       const dueLaterItems = await Todo.dueLater();
//       let todolist3 = dueLaterItems
//         .map((todo) => todo.displayableString())
//         .join("\n");
//       console.log(todolist3);
//     }

//     static async overdue() {
//       const data = await this.findAll({
//         where: {
//           dueDate: {
//             [Op.lt]: new Date(),
//           },
//         },
//       });
//       return data;
//     }

//     static async dueToday() {
//       const data = await this.findAll({
//         where: {
//           dueDate: new Date(),
//         },
//       });
//       return data;
//     }

//     static async dueLater() {
//       const data = await this.findAll({
//         where: {
//           dueDate: {
//             [Op.gt]: new Date(),
//           },
//         },
//       });
//       return data;
//     }

//     static async markAsComplete(id) {
//       const todo = await Todo.findByPk(id);

//       if (todo) {
//         todo.completed = true;
//         await todo.save();
//       }
//     }

//     displayableString() {
//       let result = "";

//       const dueDate = new Date(this.dueDate);

//       if (dueDate.toDateString() === new Date().toDateString()) {
//         const check = this.completed ? "[x]" : "[ ]";
//         result = `${this.id}. ${check} ${this.title}`;
//       } else {
//         if (dueDate > new Date() && !this.completed) {
//           const check = this.completed ? "[x]" : "[ ]";
//           result = `${this.id}. ${check} ${this.title} ${
//             dueDate.toISOString().split("T")[0]
//           }`;
//         } else {
//           const check = this.completed ? "[x]" : "[ ]";
//           result = `${this.id}. ${check} ${this.title} ${
//             dueDate.toISOString().split("T")[0]
//           }`;
//         }
//       }

//       return result;
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


'use strict';
const { Op } = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static  addTask(params) {
      return  Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueList = await Todo.overdue();
      console.log(Todo.toDisplayableList(overdueList));
      console.log("\n");

      console.log("Due Today");
      const dueTodayList = await Todo.dueToday();
      console.log(Todo.toDisplayableList(dueTodayList));
      console.log("\n");

      console.log("Due Later");
      const dueLaterList = await Todo.dueLater();
      console.log(Todo.toDisplayableList(dueLaterList));
    }

    
    static async overdue() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.lt]: today
          }
        }
      });
    }
    

    static async dueToday() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.gt]:today
          }
        }
        // where: {
        //   dueDate: today
        // }
      });
    }
   
    

    static async dueLater() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.gt]: today
          }
        }
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        await todo.update({ completed: true });
        return todo;
      } else {
        throw new Error('Todo not found');
      }
    }

   
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let datePart = this.dueDate === new Date().toISOString().split('T')[0] && !this.completed
        ? ` ${this.dueDate}`
        : '';
      return `${this.id}. ${checkbox} ${this.title}${datePart}`;
    }

  };

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
    primaryKey:'id'
  });

  Todo.toDisplayableList = (list) => {
    return list
      .map((item) => {
        const datePart = item.dueDate === new Date().toISOString().split('T')[0] ? '' : item.dueDate;
        return `[${item.completed ? 'x' : ' '}] ${item.title} ${datePart}`;
      })
      .join('\n');
  };
  

  return Todo;
};