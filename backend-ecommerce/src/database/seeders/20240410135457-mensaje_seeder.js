"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "mensaje",
      [
        {
          id_chat: 1,
          id_usuario_emisor: "usuario1",
          id_usuario_receptor: "usuario2",
          contenido: "Hola Saludos",
          fecha_envio: new Date(),
          visto: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_chat: 1,
          id_usuario_emisor: "usuario2",
          id_usuario_receptor: "usuario1",
          contenido: "Hola Saludos Devuelta",
          fecha_envio: new Date(),
          visto: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("mensaje", null, {});
  },
};
