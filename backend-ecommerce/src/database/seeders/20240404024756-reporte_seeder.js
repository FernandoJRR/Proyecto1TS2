"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "reporte",
      [
        {
          username_usuario: "usuario1",
          id_producto_servicio: 8,
          fecha_reporte: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username_usuario: "usuario1",
          id_producto_servicio: 10,
          fecha_reporte: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reporte", null, {});
  },
};
