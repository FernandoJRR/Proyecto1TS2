<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <v-icon icon="mdi-account" /> Perfil de {{ username }}
    </h1>
    <v-text-field
      v-model="user.nombre"
      label="Nombre"
      prepend-icon="mdi-account"
      variant="outlined"
      style="width: 50%"
      disabled
    ></v-text-field>

    <v-text-field
      v-model="user.username"
      label="Username"
      prepend-icon="mdi-account"
      variant="outlined"
      style="width: 50%"
      disabled
    ></v-text-field>

    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="password"
        :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        label="Password"
        @click:prepend="show = !show"
        variant="outlined"
        style="width: 50%"
        required
      ></v-text-field>

      <v-text-field
        v-model="password_rewrite"
        :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRewriteRules"
        :type="show ? 'text' : 'password'"
        label="Repetir Password"
        @click:prepend="show = !show"
        variant="outlined"
        style="width: 50%"
        required
      ></v-text-field>
      <h3 style="color: red">{{ detalle }}</h3>
      <v-btn @click="submit">Cambiar Password</v-btn>
    </v-form>
    <br />
    <br />
    <v-container v-if="userType == 'usuario'">
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <img src="@/assets/cacao.png" width="30" /> Balance de Cuenta:
        <p v-if="isFetching" style="display: inline">...</p>
        <p v-else style="display: inline">{{ cuenta.balance }}</p>
      </h1>
      <br />
      <br />
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <v-icon icon="mdi-account" /> Productos y Servicios Vendidos
      </h1>
      <br />
      <br />
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <v-icon icon="mdi-account" /> Productos y Servicios Comprados
      </h1>
    </v-container>
  </v-container>
</template>
<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    isFetching: true,

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref(),
    cuenta: ref(),

    show: false,
    password: '',
    passwordRules: [(value: any) => !!value || 'Password requerido!'],
    password_rewrite: '',
    passwordRewriteRules: [(value: any) => !!value || 'Password requerido!'],
    detalle: ''
  }),
  methods: {
    async submit() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      let response: any
      response = {}
      if (this.password != this.password_rewrite) {
        response.error = 'Las password no coinciden'
      }
      //Se comprueba si las credenciales son correctas
      if (response.error != null) {
        console.log('error, ' + response.error)
        this.detalle = response.error
      } else {
        this.detalle = ''
        toast('Password cambiada exitosamente!', { position: toast.POSITION.BOTTOM_CENTER })
      }
    }
  },
  async created() {
    this.user = ref(mockdata.usuarios[this.username as keyof typeof mockdata.usuarios])
    this.cuenta = ref(mockdata.cuentas[this.username as keyof typeof mockdata.cuentas])
    this.isFetching = false
  }
}
</script>
