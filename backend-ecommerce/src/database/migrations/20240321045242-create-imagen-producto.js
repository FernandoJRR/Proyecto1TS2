'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagen_producto_servicio', {
      id_producto_servicio: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {model: 'producto_servicio', key: 'id'}
      },
      imagen_base64: {
        type: Sequelize.TEXT
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imagen_producto_servicio');
  }
};