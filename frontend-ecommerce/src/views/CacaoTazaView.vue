<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Taza de Cambio Actual:</h1>
    <v-form ref="formVender" @submit.prevent="cambiarTaza">
      <v-row>
        <v-col>
          <h3>Quetzal</h3>
          <br />
          <v-form ref="formComprar">
            <v-text-field
              v-model="quetzaltes"
              label="Quetzales"
              variant="outlined"
              style="width: 50%"
              type="number"
              disabled
            ></v-text-field>
          </v-form>
        </v-col>
        <v-col>
          <h3>Cacao</h3>
          <br />
          <v-text-field
            v-model="cacao"
            :rules="cacaoRules"
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
    cacaoRules: [(value: any) => !!value || 'Cantidad requerida!'],
    detalle: '',

    username: localStorage.getItem('user'),
    user: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal)
  }),
  methods: {
    async cambiarTaza() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return
      let response: any
      response = {}
      if (this.cacao == null || this.cacao < 0 || this.cacao == 0) {
        response.error = 'La cantidad ingresada no es valida'
      }
      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log('error, ' + response.error)
        this.detalle = response.error
      } else {
        toast('Taza actualizada exitosamente')
      }
    }
  },
  async created() {
    this.cacao = ref(mockdata.tipo_cambio.cacao_por_quetzal)
    this.isFetching = false
  }
}
</script>
