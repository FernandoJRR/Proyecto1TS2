'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mensaje', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_chat: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'chat', key: 'id'}
      },
      id_usuario_emisor: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      id_usuario_receptor: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      contenido: {
        type: Sequelize.TEXT
      },
      fecha_envio: {
        type: Sequelize.DATE
      },
      visto: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('mensaje');
  }
};