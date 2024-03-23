"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "producto_servicio",
      [
        {
          nombre: "Cuaderno de Dibujo",
          descripcion: "Es un cuaderno de dibujo con hojas de 120g",
          precio: 20,
          usuario_vendedor: "usuario1",
          fecha_publicacion: new Date("2024-03-14"),
          //id_categoria: 1,
          usuario_autorizador: null,
          fecha_autorizacion: null,
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Realizacion de pulseras",
          descripcion: "Servicio de realizacion de pulseras de colores",
          precio: 15.5,
          usuario_vendedor: "usuario2",
          fecha_publicacion: new Date("2024-03-14"),
          //id_categoria: 1,
          usuario_autorizador: "admin1",
          fecha_autorizacion: new Date("2024-03-19"),
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Lectura de cuentos",
          descripcion: "Servicio de lectura de cuentos",
          precio: 50,
          usuario_vendedor: "usuario1",
          fecha_publicacion: new Date("2024-03-14"),
          //id_categoria: 1,
          usuario_autorizador: "admin1",
          fecha_autorizacion: new Date("2024-03-14"),
          usuario_comprador: "usuario2",
          fecha_compra: new Date("2024-03-19"),
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Collar de Jade",
          descripcion: "Es un collar de jade con un nahual grabado",
          precio: 100.5,
          usuario_vendedor: "usuario2",
          fecha_publicacion: new Date("2024-03-14"),
          //id_categoria: 1,
          usuario_autorizador: null,
          fecha_autorizacion: null,
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Kit de Acuarelas",
          descripcion: "Kit con diferentes tipos de acuarelas",
          precio: 30,
          usuario_vendedor: "usuario1",
          fecha_publicacion: new Date("2024-03-14"),
          //id_categoria: 1,
          usuario_autorizador: null,
          fecha_autorizacion: null,
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Programacion de Paginas Web",
          descripcion: "Servicio de programacion de paginas web",
          precio: 100,
          usuario_vendedor: "usuario2",
          fecha_publicacion: new Date("2024-03-15"),
          //id_categoria: 1,
          usuario_autorizador: null,
          fecha_autorizacion: null,
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Teclado Mecanico",
          descripcion: "Teclado mecanico con switches rojos, seminuevo",
          precio: 200,
          usuario_vendedor: "usuario1",
          fecha_publicacion: new Date("2024-03-15"),
          //id_categoria: 1,
          usuario_autorizador: "admin1",
          fecha_autorizacion: new Date("2024-03-15"),
          usuario_comprador: null,
          fecha_compra: null,
          usuario_baja: null,
          fecha_baja: null,
          es_servicio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("producto_servicio", null, {});
  },
};
