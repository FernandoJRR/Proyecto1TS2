<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <img src="@/assets/cacao.png" width="30" /> Balance de Cuenta:
      <p v-if="isFetchingProfile" style="display: inline">...</p>
      <p v-else style="display: inline">{{ cuenta_data.balance_cacao }}</p>
    </h1>

    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Taza de Cambio Actual:</h1>
    <v-container style="margin-bottom: 2vh">
      <h3 style="display: inline">1 Quetzal - {{ taza_cambio_data }} Cacao</h3>
      <img src="@/assets/cacao.png" width="30" />
    </v-container>
    <v-row>
      <v-col>
        <h3>Comprar Cacao</h3>
        <br />
        <v-form ref="formComprar" @submit.prevent="comprar">
          <v-text-field
            v-model="cacaoComprar"
            :rules="cacaoComprarRules"
            label="Cantidad a Comprar"
            variant="outlined"
            style="width: 50%"
            type="number"
            required
          ></v-text-field>
          <v-btn @click="comprar"
            >Comprar por: {{ cacaoComprar == null ? 0 : cacaoComprar * taza_cambio_data }} Q</v-btn
          >
          <h3 style="color: red">{{ detalleComprar }}</h3>
        </v-form>
      </v-col>
      <v-col>
        <h3>Vender Cacao</h3>
        <br />
        <v-form ref="formVender" @submit.prevent="vender">
          <v-text-field
            v-model="cacaoVender"
            :rules="cacaoVenderRules"
            label="Cantidad a Comprar"
            variant="outlined"
            style="width: 50%"
            type="number"
            required
          ></v-text-field>
          <v-btn @click="vender"
            >Vender por: {{ cacaoVender == null ? 0 : cacaoVender * taza_cambio }} Q</v-btn
          >
          <h3 style="color: red">{{ detalleVender }}</h3>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: vm => ({
    isFetchingProfile: true,
    isFetchingExchange: true,

    cacaoComprar: null,
    cacaoComprarRules: [
      (value: any) => !!value || 'Cantidad requerida!',
      (value: any) => value > 0 || 'La cantidad ingresada no es valida',
    ],
    detalleComprar: '',
    cacaoVender: null,
    cacaoVenderRules: [
      (value: any) => !!value || 'Cantidad requerida!',
      (value: any) => value > 0 || 'La cantidad ingresada no es valida',
      (value: any) => vm.validateVenderCacao(value) || 'No cuentas con esta cantidad de cacao',
    ],
    detalleVender: '',

    username: localStorage.getItem('user'),
    user: ref(),
    cuenta: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal)
  }),
  computed: {
    user_data: {
      get: function () {
        if (typeof this.user !== 'undefined') {
          return this.user
        } else {
          return false
        }
      },
      set: function (val: any) {
        this.user = val
      }
    },
    cuenta_data: {
      get: function () {
        if (typeof this.cuenta !== 'undefined') {
          return this.cuenta
        } else {
          return false
        }
      },
      set: function (val: any) {
        this.cuenta = val
      }
    },
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
    validateVenderCacao(cantidadVender: number) {
      if (cantidadVender <= this.cuenta.balance_cacao) return true
      return false
    },
    async comprar() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return

      const response = await this.buy({ username: this.username, cantidad: this.cacaoComprar })
      const data = await response.json()
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalleComprar = data
      } else {
        ;(this.$refs.formComprar as any).reset()
        const nueva_cuenta = await this.getPerfil()
        const data_nueva_cuenta = await nueva_cuenta.json()
        this.cuenta = data_nueva_cuenta.cuenta
        toast(data)
      }
    },
    async buy(input: any) {
      return await fetch('http://localhost:8080/cacao/comprar-cacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async vender() {
      const { valid } = await (this.$refs.formVender as any).validate()
      if (!valid) return

      if (this.cacaoVender != null && this.cacaoVender > this.cuenta.balance_cacao) {
        this.detalleVender = 'No cuentas con la cantidad de cacao que quieres vender'
        return
      }

      const response = await this.sell({ username: this.username, cantidad: this.cacaoVender })
      const data = await response.json()

      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalleVender = data
      } else {
        ;(this.$refs.formVender as any).reset()
        const nueva_cuenta = await this.getPerfil()
        const data_nueva_cuenta = await nueva_cuenta.json()
        this.cuenta = data_nueva_cuenta.cuenta
        toast(data)
      }
    },
    async sell(input: any) {
      return await fetch('http://localhost:8080/cacao/vender-cacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async getPerfil() {
      return await fetch(`http://localhost:8080/usuario/${this.username}`, {
        method: 'GET'
      })
    },
    async getTazaCambio() {
      return await fetch(`http://localhost:8080/taza-cambio`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getPerfil()
      .then((response) => response.json())
      .then((data) => {
        this.user = data
        this.cuenta = data.cuenta
        this.isFetchingProfile = false
      })
    this.getTazaCambio()
      .then((response) => response.json())
      .then((data) => {
        this.taza_cambio = data.cacao_por_quetzal
        this.isFetchingExchange = false
      })
  }
}
</script>
