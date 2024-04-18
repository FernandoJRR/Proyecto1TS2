"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("producto_servicio", "id_categoria", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categoria",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("producto_servicio", "id_categoria");
  },
};
