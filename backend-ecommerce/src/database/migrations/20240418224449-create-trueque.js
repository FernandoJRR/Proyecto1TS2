'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trueque', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_producto_servicio_requerido: {
        type: Sequelize.INTEGER,
        references: {model: 'producto_servicio', key: 'id'}
      },
      id_producto_servicio_ofrecido: {
        type: Sequelize.INTEGER,
        references: {model: 'producto_servicio', key: 'id'}
      },
      cacao_ofrecido: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('trueque');
  }
};