// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.addColumn('Todos','userId',{
//       type: Sequelize.DataTypes.INTEGER
//     })

//     await queryInterface.addConstraint('Todos', {
//       fields: ['userId'],
//       type:'foreign key',
//       references:{
//         table: 'Users',
//         field:'id'
//       }
//     })
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.removeColumn('Todos','userId')
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//   }
// };


'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Check if the 'userId' column already exists in the 'Todos' table
      const [results] = await queryInterface.sequelize.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name='Todos' AND column_name='userId';"
      );
  
      if (results.length === 0) {
        // 'userId' column does not exist, so add it
        await queryInterface.addColumn('Todos', 'userId', {
          type: Sequelize.DataTypes.INTEGER,
        });
  
        // Add the constraint if needed
        await queryInterface.addConstraint('Todos', {
          fields: ['userId'],
          type: 'foreign key',
          references: {
            table: 'Users',
            field: 'userId',
          },
        });
      }
    } catch (error) {
      console.error('Error during migration:', error);
      throw error; // Rethrow the error to stop the migration
    }
  },
  
  

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Todos','userId')
    // await queryInterface.removeConstraint('Todos', 'Todos_userId_fkey');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};