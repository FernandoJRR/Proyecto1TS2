"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "chat",
      [
        {
          id_usuario_1: "usuario1",
          id_usuario_2: "usuario2",
          id_producto_servicio: 9,
          fecha_inicio: new Date(),
          fecha_finalizacion: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("chat", null, {});
  },
};
