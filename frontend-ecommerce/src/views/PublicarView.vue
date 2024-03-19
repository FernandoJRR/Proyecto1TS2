<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      Publicar Producto o Servicio
    </h1>

    <v-form ref="form" @submit.prevent="publicar">
      <v-select
        v-model="tipoPublicacion"
        :rules="tipoPublicacionRules"
        label="Tipo"
        :items="['Producto', 'Servicio']"
        style="width: 75%"
      />
      <v-text-field
        v-model="nombre"
        :rules="nombreRules"
        label="Nombre"
        variant="outlined"
        style="width: 75%"
        required
      ></v-text-field>
      <v-textarea
        v-model="descripcion"
        :rules="descripcionRules"
        label="Descripcion"
        variant="outlined"
        style="width: 75%"
        required
      ></v-textarea>
      <v-text-field
        v-model="precio"
        :rules="precioRules"
        label="Precio"
        variant="outlined"
        type="number"
        style="width: 75%"
        required
      ></v-text-field>
      <v-btn @click="publicar">Registrar</v-btn>
      <h3 style="color: red">{{ detalle }}</h3>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    isFetching: true,

    tipoPublicacion: '',
    tipoPublicacionRules: [(value: any) => !!value || 'Tipo de publicacion requerido!'],
    nombre: '',
    nombreRules: [(value: any) => !!value || 'Nombre requerido!'],
    descripcion: '',
    descripcionRules: [(value: any) => !!value || 'Descripcion requerida!'],
    precio: 0,
    precioRules: [(value: any) => !!value || 'Precio requerido!'],
    detalle: '',

    user: ref(localStorage.getItem('user')),
    cuenta: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal)
  }),
  methods: {
    async publicar() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      let response: any
      response = {}
      if (this.precio == null || this.precio < 0 || this.precio == 0) {
        response.error = 'El precio ingresado no es valido'
      }
      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log('error, ' + response.error)
        this.detalle = response.error
      } else {
        toast('Producto registrado exitosamente')
      }
    }
  },
  async created() {
    this.cuenta = ref(mockdata.cuentas[this.user as keyof typeof mockdata.cuentas])
    this.isFetching = false
  }
}
</script>
