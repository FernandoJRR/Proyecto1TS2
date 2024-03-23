'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuenta', {
      username: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      balance: {
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuenta');
  }
};