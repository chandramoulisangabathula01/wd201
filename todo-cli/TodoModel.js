const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('./connectDB.js')

class Todo extends Model {
//   static createTask = async (taskData) => {
//     try {
//       const todo = await Todo.create(taskData)
//       return todo
//     } catch (error) {
//       throw error
//     }
//   }
  static async addTask (params) {
    return await Todo.create(params)
  }

  displayableString () {
    return `${this.completed ? '[x]' : '[ ]'} ${this.id}. ${this.title} - ${this.dueDate}`
  }
}
Todo.init(
  {
    // Model attributes are defined here
    // id: {
    //   type: DataTypes.INTEGER
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATEONLY
    },
    completed: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize
  }
)

Todo.sync()
module.exports = Todo
