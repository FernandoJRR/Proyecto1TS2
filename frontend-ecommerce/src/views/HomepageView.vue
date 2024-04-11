<template>
  <v-container>
    <v-form ref="formBuscar" @submit.prevent="buscar" class="d-flex">
      <v-text-field
        v-model="inputBusqueda"
        label="Buscar"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
      >
        <template #append>
          <v-btn variant="outlined" @click="limpiar">Limpiar Busqueda</v-btn>
        </template>
      </v-text-field>
    </v-form>
    <h1 v-if="!modo_busqueda" style="font-family: 'Monaco', monospace; color: #fcd667">
      Ultimos Productos
    </h1>
    <h1 v-else style="font-family: 'Monaco', monospace; color: #fcd667">Resultados</h1>
    <h3 v-if="productos.length == 0">No hay productos que mostrar :(</h3>
    <v-container v-for="item in productos as any[]" :key="item.id">
      <ProductCard
        :id="item.id"
        :tipo="item.es_servicio ? 'Servicio' : 'Producto'"
        :nombre="item.nombre"
        :precio="item.precio"
        :vendedor="item.usuario_vendedor"
        :fecha_publicacion="item.fecha_publicacion"
        :imagen_publicacion="item.imagenProductoServicio.imagen_base64"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { toast } from 'vue3-toastify'

export default {
  components: {
    ProductCard
  },
  data: () => ({
    isFetching: true,

    productos: [],

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref(),

    producto: ref(),

    inputBusqueda: '',
    modo_busqueda: false
  }),
  methods: {
    async limpiar() {
    this.getProductosHomePage()
      .then((response) => response.json())
      .then((data) => {
        this.productos = data
        this.isFetching = false
      })
      this.inputBusqueda = ''
      this.modo_busqueda = false
    },
    async comprar() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return
    },
    async getProductosHomePage() {
      return await fetch(
        `http://localhost:8080/producto-servicio/productos-homepage/${this.username}`,
        {
          method: 'GET'
        }
      )
    },
    async buscar() {
      const response = await this.search(this.inputBusqueda)
      const data = await response.json()

      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        toast(data)
      } else {
        this.productos = data
        this.modo_busqueda = true
      }
    },
    async search(busqueda:string) {
      return await fetch(`http://localhost:8080/producto-servicio/buscar/${busqueda}`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getProductosHomePage()
      .then((response) => response.json())
      .then((data) => {
        this.productos = data
        this.isFetching = false
      })
  }
}
</script>
