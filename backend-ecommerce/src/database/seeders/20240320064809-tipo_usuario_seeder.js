"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tipo_usuario",
      [
        {
          codigo: "admin",
        },
        {
          codigo: "usuario",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipo_usuario", null, {});
  },
};
