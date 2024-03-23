"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuario",
      [
        {
          username: "usuario1",
          nombre: "Arturo Merida",
          password: "password",
          id_tipo_usuario: 2,
          es_publico: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "usuario2",
          nombre: "Francisco Garza",
          password: "password",
          id_tipo_usuario: 2,
          es_publico: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "admin1",
          nombre: "Roberto Gonzales",
          password: "pass123",
          id_tipo_usuario: 1,
          es_publico: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario", null, {});
  },
};
