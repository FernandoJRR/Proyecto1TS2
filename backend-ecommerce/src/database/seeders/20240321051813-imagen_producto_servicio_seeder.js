"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "imagen_producto_servicio",
      [
        {
          id_producto_servicio: 1,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 2,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 3,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 4,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 5,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 6,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
        {
          id_producto_servicio: 7,
          updatedAt: new Date(),
          imagen_base64:
            "default.ib64",
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("imagen_producto_servicio", null, {});
  },
};
