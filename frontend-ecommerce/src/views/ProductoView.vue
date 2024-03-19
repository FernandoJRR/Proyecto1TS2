<template>
  <v-container align="center">
    <v-container v-if="!isFetching">
      <v-row style="margin-bottom: 3vh">
        <v-col>
          <v-btn
            v-if="userType == 'admin'"
            variant="outlined"
            prepend-icon="mdi-arrow-left"
            to="/autorizar"
            >Ir a listado</v-btn
          >
        </v-col>
        <v-col>
          <h2 style="font-family: 'Monaco', monospace; color: #fcd667">
            {{ producto.es_servicio ? 'Servicio' : 'Producto' }}
          </h2>
          <h1 style="font-family: 'Monaco', monospace; color: #fcd667">{{ producto.nombre }}</h1>
        </v-col>
        <v-col> Precio: {{ producto.precio }} Cacao </v-col>
      </v-row>
      <p style="margin-bottom: 3vh">{{ producto.descripcion }}</p>
      Publicado por: {{ producto.usuario_vendedor }} el {{ producto.fecha_publicacion }}
    </v-container>
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    isFetching: true,

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref(),
    cuenta: ref(),

    detalle: '',

    producto: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal)
  }),
  methods: {
    async comprar() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return
      let response: any
      response = {}

      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log('error, ' + response.error)
        this.detalle = response.error
      } else {
        toast('Cacao comprado exitosamente')
      }
    }
  },
  async created() {
    this.producto = ref(
      mockdata.productos_servicios[
        this.$route.params.id as keyof typeof mockdata.productos_servicios
      ]
    )
    this.user = ref(mockdata.usuarios[this.username as keyof typeof mockdata.usuarios])
    this.cuenta = ref(mockdata.cuentas[this.user.username as keyof typeof mockdata.cuentas])
    this.isFetching = false
  }
}
</script>
