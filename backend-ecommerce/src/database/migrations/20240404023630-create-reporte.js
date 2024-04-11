'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reporte', {
      username_usuario: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      id_producto_servicio: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {model: 'producto_servicio', key: 'id'}
      },
      fecha_reporte: {
        allowNull: false,
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
    await queryInterface.dropTable('reporte');
  }
};