<template>
  <v-container>
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Ultimos Productos</h1>
    <v-container v-for="item in productos_homepage as any[]" :key="item.id">
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

    productos_homepage: [],

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref(),

    producto: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal)
  }),
  methods: {
    async comprar() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return
    },
    async getProductosHomePage() {
      return await fetch(`http://localhost:8080/producto-servicio/productos-homepage/${this.username}`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getProductosHomePage()
      .then((response) => response.json())
      .then((data) => {
        this.productos_homepage = data
        this.isFetching = false
      })
  }
}
</script>
