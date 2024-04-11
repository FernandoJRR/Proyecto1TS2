'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario_1: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      id_usuario_2: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      id_producto_servicio: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'producto_servicio', key: 'id'}
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_finalizacion: {
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
    await queryInterface.dropTable('chat');
  }
};