<template>
  <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
    Productos y Servicios por Autorizar
  </h1>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">Tipo</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Vendedor</th>
        <th class="text-left">Precio</th>
        <th class="text-left">Fecha de Publicacion</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productos_por_autorizar" :key="item.id">
        <td>{{ item.es_servicio ? 'Servicio' : 'Producto' }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.usuario_vendedor }}</td>
        <td>{{ item.precio }}</td>
        <td>{{ item.fecha_publicacion }}</td>
        <td>
          <v-btn variant="plain" @click="verProducto(item.id)">ver</v-btn>
          <v-btn variant="plain" @click="aprobarProducto(item.id)">aprobar</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
    Productos y Servicios Autorizados
  </h1>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">Tipo</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Vendedor</th>
        <th class="text-left">Precio</th>
        <th class="text-left">Fecha de Publicacion</th>
        <th class="text-left">Usuario Autorizador</th>
        <th class="text-left">Fecha Autorizacion</th>
        <th class="text-left">Estado</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productos_autorizados" :key="item.id">
        <td>{{ item.es_servicio ? 'Servicio' : 'Producto' }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.usuario_vendedor }}</td>
        <td>{{ item.precio }}</td>
        <td>{{ item.fecha_publicacion }}</td>
        <td>{{ item.usuario_autorizador }}</td>
        <td>{{ item.fecha_autorizacion }}</td>
        <td>{{ item.usuario_comprador == null ? 'Aprobado' : 'Comprado' }}</td>
        <td>
          <v-btn variant="plain" @click="verProducto(item.id)">Ver</v-btn>
          <v-btn v-if="item.usuario_comprador == null" variant="plain" @click="desaprobarProducto(item.id)"
            >Desaprobar</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>

  <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
    Productos y Servicios Reportados
  </h1>
  <v-table theme="dark">
    <thead>
      <tr>
        <th class="text-left">Tipo</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Vendedor</th>
        <th class="text-left">Precio</th>
        <th class="text-left">Fecha de Publicacion</th>
        <th class="text-left">Usuario Autorizador</th>
        <th class="text-left">Fecha Autorizacion</th>
        <th class="text-left">Estado</th>
        <th class="text-left">Reportes</th>
        <th class="text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in productos_reportados" :key="item.id">
        <td>{{ item.es_servicio ? 'Servicio' : 'Producto' }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.usuario_vendedor }}</td>
        <td>{{ item.precio }}</td>
        <td>{{ item.fecha_publicacion.split('T')[0] }}</td>
        <td>{{ item.usuario_autorizador }}</td>
        <td>{{ item.fecha_autorizacion.split('T')[0] }}</td>
        <td>{{ item.usuario_comprador == null ? 'Aprobado' : 'Comprado' }}</td>
        <td>{{ item.count }}</td>
        <td>
          <v-btn variant="plain" @click="verProducto(item.id)">Ver</v-btn>
          <v-btn v-if="item.usuario_comprador == null" variant="plain" @click="desaprobarProducto(item.id)"
            >Desaprobar</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
export default {
  data: () => ({
    productos_por_autorizar: ref(),
    productos_autorizados: ref(),
    productos_reportados: ref(),

    username: localStorage.getItem('user'),

    isFetching: true
  }),
  methods: {
    verProducto(id_producto: number) {
      router.push('producto/' + id_producto)
    },
    async aprobarProducto(id_producto: number) {
      const response = await this.approveProductoServicio(id_producto, {
        usuario_autorizador: this.username
      })
      const data = response.json()

      if (response.status == 200) {
        toast('Aprobacion exitosa')

        this.getProductosPorAutorizar()
          .then((response) => response.json())
          .then((data) => {
            this.productos_por_autorizar = data
          })
        this.getProductosAutorizados()
          .then((response) => response.json())
          .then((data) => {
            this.productos_autorizados = data
          })
        this.getProductosReportados()
          .then((response) => response.json())
          .then((data) => {
            this.productos_reportados = data
          })
      }
    },
    async desaprobarProducto(id_producto: number) {
      const response = await this.disapproveProductoServicio(id_producto, {
        usuario_autorizador: this.username
      })
      const data = response.json()

      if (response.status == 200) {
        toast('Desprobacion exitosa')

        this.getProductosPorAutorizar()
          .then((response) => response.json())
          .then((data) => {
            this.productos_por_autorizar = data
          })
        this.getProductosAutorizados()
          .then((response) => response.json())
          .then((data) => {
            this.productos_autorizados = data
          })
      }
    },
    async approveProductoServicio(id_producto: number, input: any) {
      return await fetch(`http://localhost:8080/producto-servicio/aprobar/${id_producto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async disapproveProductoServicio(id_producto: number, input: any) {
      return await fetch(`http://localhost:8080/producto-servicio/desaprobar/${id_producto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async getProductosPorAutorizar() {
      return await fetch(`http://localhost:8080/producto-servicio/productos-por-aprobar`, {
        method: 'GET'
      })
    },
    async getProductosAutorizados() {
      return await fetch(`http://localhost:8080/producto-servicio/productos-aprobados`, {
        method: 'GET'
      })
    },
    async getProductosReportados() {
      return await fetch(`http://localhost:8080/producto-servicio/reportes`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getProductosPorAutorizar()
      .then((response) => response.json())
      .then((data) => {
        this.productos_por_autorizar = data
      })
    this.getProductosAutorizados()
      .then((response) => response.json())
      .then((data) => {
        this.productos_autorizados = data
      })
    this.getProductosReportados()
      .then((response) => response.json())
      .then((data) => {
        this.productos_reportados = data
      })
    this.isFetching = false
  }
}
</script>
