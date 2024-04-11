"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transaccion",
      [
        {
          username_cuenta: "usuario2",
          monto_cacao: 10,
          balance_cacao: 10,
          monto_puntos: 0,
          balance_puntos: 0,
          motivo: "Motivo 1",
          fecha_transaccion: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transaccion", null, {});
  },
};
