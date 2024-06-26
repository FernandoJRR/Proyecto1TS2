"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cuenta",
      [
        {
          username: "usuario1",
          balance_cacao: 0,
          balance_puntos: 0,
        },
        {
          username: "usuario2",
          balance_cacao: 10,
          balance_puntos: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cuenta", null, {});
  },
};
