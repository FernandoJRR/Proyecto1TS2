"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cuenta",
      [
        {
          username: "usuario1",
          balance: 0,
        },
        {
          username: "usuario2",
          balance: 0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cuenta", null, {});
  },
};
