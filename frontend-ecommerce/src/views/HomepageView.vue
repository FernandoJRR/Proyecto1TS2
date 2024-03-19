<template>
  <v-container>
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Ultimos Productos</h1>
    <v-container v-for="item in productos_autorizados" :key="item.id">
      <ProductCard
        :id="item.id"
        :tipo="item.es_servicio ? 'Servicio' : 'Producto'"
        :nombre="item.nombre"
        :precio="item.precio"
        :vendedor="item.usuario_vendedor"
        :fecha_publicacion="item.fecha_publicacion"
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

    productos_autorizados: ref(),

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
    }
  },
  async created() {
    this.productos_autorizados = ref(
      Object.entries(mockdata.productos_servicios)
        .filter(([, value]) => value.usuario_autorizador != null)
        .filter(([, value]) => value.usuario_comprador == null)
        .reduce((acc: any, [key, value]) => {
          acc[key] = value
          return acc
        }, {})
    )
    this.user = ref(mockdata.usuarios[this.username as keyof typeof mockdata.usuarios])
    this.isFetching = false
  }
}
</script>
