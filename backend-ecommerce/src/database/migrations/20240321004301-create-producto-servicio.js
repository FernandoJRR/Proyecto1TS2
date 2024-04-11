'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('producto_servicio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      precio: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      usuario_vendedor: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      fecha_publicacion: {
        type: Sequelize.DATE
      },
      /*
      id_categoria: {
        type: Sequelize.NUMBER
      },
      */
      usuario_autorizador: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      fecha_autorizacion: {
        type: Sequelize.DATE
      },
      usuario_comprador: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      fecha_compra: {
        type: Sequelize.DATE
      },
      usuario_baja: {
        type: Sequelize.STRING,
        references: {model: 'usuario', key: 'username'}
      },
      fecha_baja: {
        type: Sequelize.DATE
      },
      es_servicio: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      disponible_por_trueque: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('producto_servicio');
  }
};