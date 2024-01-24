'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
    });

    await queryInterface.addConstraint('Todos', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Save the data from the 'userId' column before removing it
    const todos = await queryInterface.sequelize.query('SELECT id, userId FROM "Todos"');

    await queryInterface.removeColumn('Todos', 'userId');

    // If you need to recreate the 'userId' column during rollback
    await queryInterface.addColumn('Todos', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
    });

    // Update the 'userId' column with the saved data
    for (const todo of todos[0]) {
      await queryInterface.sequelize.query(
        `UPDATE "Todos" SET "userId" = ${todo.userId} WHERE id = ${todo.id}`
      );
    }
  },
};
