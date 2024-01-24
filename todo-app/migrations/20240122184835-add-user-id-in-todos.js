'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Todos','userId',{
      type: Sequelize.DataTypes.INTEGER
    })

    await queryInterface.addConstraint('Todos',{
      fields:['userId'],
      type:'foreign key',
      references:{
        table:'Users',
        field:'userId'
      }
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
