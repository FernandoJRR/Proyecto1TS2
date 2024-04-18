"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categoria",
      [
        {
          nombre: "Arte",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Automobiles",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Comida",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Computadoras",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Construccion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Electrodomesticos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Electronicos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Hogar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Musica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Reparacion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categoria", null, {});
  },
};
