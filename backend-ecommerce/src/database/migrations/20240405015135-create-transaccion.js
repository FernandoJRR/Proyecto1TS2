'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaccion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username_cuenta: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {model: 'cuenta', key: 'username'}
      },
      monto_cacao: {
        type: Sequelize.FLOAT
      },
      balance_cacao: {
        type: Sequelize.FLOAT
      },
      monto_puntos: {
        type: Sequelize.FLOAT
      },
      balance_puntos: {
        type: Sequelize.FLOAT
      },
      motivo: {
        type: Sequelize.STRING
      },
      fecha_transaccion: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaccion');
  }
};