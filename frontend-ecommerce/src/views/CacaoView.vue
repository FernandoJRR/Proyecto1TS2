<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <img src="@/assets/cacao.png" width="30" /> Balance de Cuenta:
      <p v-if="isFetching" style="display: inline">...</p>
      <p v-else style="display: inline">{{ cuenta.balance }}</p>
    </h1>

    <h1 style="font-family: 'Monaco', monospace; color: #fcd667">Taza de Cambio Actual:</h1>
    <v-container style="margin-bottom: 2vh">
      <h3 style="display: inline">1 Quetzal - {{ taza_cambio }} Cacao</h3>
      <img src="@/assets/cacao.png" width="30" />
    </v-container>
    <v-row>
      <v-col>
        <h3>Comprar Cacao</h3>
        <br/>
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
          <v-btn @click="comprar">Comprar por: {{ cacaoComprar == null ? 0 : cacaoComprar * taza_cambio }} Q</v-btn>
          <h3 style="color:red">{{detalleComprar}}</h3>
        </v-form>
      </v-col>
      <v-col>
        <h3>Vender Cacao</h3>
        <br/>
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
          <v-btn @click="vender">Vender por: {{ cacaoVender == null ? 0 : cacaoVender * taza_cambio }} Q</v-btn>
          <h3 style="color:red">{{detalleVender}}</h3>
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
  data: () => ({
    isFetching: true,

    cacaoComprar: null,
    cacaoComprarRules: [(value: any) => !!value || 'Cantidad requerida!'],
    detalleComprar: "",
    cacaoVender: null,
    cacaoVenderRules: [(value: any) => !!value || 'Cantidad requerida!'],
    detalleVender: "",

    username: localStorage.getItem('user'),
    user: ref(),
    cuenta: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal),
  }),
  methods: {
    async comprar() {
      const { valid } = await (this.$refs.formComprar as any).validate()
      if (!valid) return
      let response: any;
      response = {};
      if (this.cacaoComprar == null || this.cacaoComprar < 0 || this.cacaoComprar == 0) {
        response.error = "La cantidad ingresada no es valida";
      }
      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log("error, "+response.error);
        this.detalleComprar = response.error;
      } else {
        toast('Cacao comprado exitosamente');
      }
    },
    async vender() {
      const { valid } = await (this.$refs.formVender as any).validate()
      if (!valid) return
      let response: any;
      response = {};
      if (this.cacaoVender == null || this.cacaoVender < 0 || this.cacaoVender == 0) {
        response.error = "La cantidad ingresada no es valida";
      } 
      if (this.cacaoVender != null && this.cacaoVender > this.cuenta.balance) {
        response.error = "No cuentas con la cantidad de cacao que quieres vender";
      }

      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log("error, "+response.error);
        this.detalleVender = response.error;
      } else {
        toast('Cacao vendido exitosamente');
      }
    }
  },
  async created() {
    this.user = ref(mockdata.usuarios[this.username as keyof typeof mockdata.usuarios])
    this.cuenta = ref(mockdata.cuentas[this.user.username as keyof typeof mockdata.cuentas])
    this.isFetching = false
  }
}
</script>
