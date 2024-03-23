<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Taza de Cambio Actual:</h1>
    <v-form ref="form" @submit.prevent="cambiarTaza">
      <v-row>
        <v-col>
          <h3>Quetzal</h3>
          <br />
          <v-text-field
            v-model="quetzaltes"
            label="Quetzales"
            variant="outlined"
            style="width: 50%"
            type="number"
            disabled
          ></v-text-field>
        </v-col>
        <v-col>
          <h3>Cacao</h3>
          <br />
          <v-text-field
            v-model="taza_cambio_data"
            :rules="tazaRules"
            label="Cantidad a Comprar"
            variant="outlined"
            style="width: 50%"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="cambiarTaza">Actualizar Taza</v-btn>
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

    quetzaltes: 1,
    cacao: ref(),
    tazaRules: [
      (value: any) => !!value || 'Cantidad requerida!',
      (value: any) => value > 0 || 'La cantidad ingresada no es valida',
    ],
    detalle: '',

    username: localStorage.getItem('user'),
    user: ref(),

    taza_cambio: ref()
  }),
  computed: {
    taza_cambio_data: {
      get: function () {
        if (typeof this.taza_cambio !== 'undefined') {
          return this.taza_cambio
        } else {
          return 1
        }
      },
      set: function (val: any) {
        this.taza_cambio = val
      }
    }
  },
  methods: {
    async cambiarTaza() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return

      const response = await this.changeExchange({ nuevo_tipo_cambio: this.taza_cambio_data })
      const data = await response.json()
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data
      } else {
        ;(this.$refs.form as any).reset()
        this.taza_cambio_data = data.cacao_por_quetzal
        toast('Taza actualizada exitosamente')
      }
    },
    async changeExchange(input: any) {
      return await fetch(`http://localhost:8080/taza-cambio/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async getTazaCambio() {
      return await fetch(`http://localhost:8080/taza-cambio`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getTazaCambio()
      .then((response) => response.json())
      .then((data) => {
        this.taza_cambio = data.cacao_por_quetzal
        this.isFetching = false
      })
  }
}
</script>
