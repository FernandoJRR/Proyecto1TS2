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
        <th class="text-left">Fecha Autorizacion</th>
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
        <td>{{ item.fecha_autorizacion }}</td>
        <td>
          <v-btn variant="plain" @click="verProducto(item.id)">ver</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { ref } from 'vue'
export default {
  data: () => ({
    productos_por_autorizar: ref(),
    productos_autorizados: ref(),

    isFetching: true
  }),
  methods: {
    verProducto(id_producto: number) {
      router.push('producto/' + id_producto)
    },
    aprobarProducto(id_producto: number) {
      console.log(id_producto)
    }
  },
  async created() {
    this.productos_por_autorizar = ref(
      Object.entries(mockdata.productos_servicios)
        .filter(([, value]) => value.usuario_autorizador == null)
        .reduce((acc: any, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    )
    this.productos_autorizados = ref(
      Object.entries(mockdata.productos_servicios)
        .filter(([, value]) => value.usuario_autorizador != null)
        .reduce((acc: any, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    )
    this.isFetching = false
  }
}
</script>
