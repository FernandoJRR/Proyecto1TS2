<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <img src="@/assets/cacao.png" width="30" /> k’ayb’äl - registro
      <img src="@/assets/cacao.png" width="30" />
    </h1>
    <a href="/">
      <v-btn style="margin-left: -50%; margin-top: -10%" to="/" variant="text"
        ><v-icon icon="mdi-arrow-left" />Ir al Inicio</v-btn
      >
    </a>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="nombre"
        :rules="nombreRules"
        label="Nombre"
        prepend-icon="mdi-account"
        variant="outlined"
        style="width: 50%"
        required
      ></v-text-field>

      <v-text-field
        v-model="username"
        :rules="usernameRules"
        label="Username"
        prepend-icon="mdi-account"
        variant="outlined"
        style="width: 50%"
        required
      ></v-text-field>

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
      <v-btn type="submit">Registrarse</v-btn>
      <h3 style="color: red">{{ detalle }}</h3>
      <br />
      <h3>Si ya tienes una cuenta puedes logearte <router-link to="/login">aqui!</router-link></h3>
    </v-form>
  </v-container>
</template>
<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    show: false,
    nombre: '',
    nombreRules: [(value: any) => !!value || 'Nombre requerido!'],
    username: '',
    usernameRules: [(value: any) => !!value || 'Username requerido!'],
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
      if (this.password != this.password_rewrite) {
        this.detalle = 'Las password no coinciden'
      }

      const response = await this.registrateUsuario({
        username: this.username,
        password: this.password,
        nombre: this.nombre,
        id_tipo_usuario: 2,
        es_publico: true
      })
      const data = await response.json()

      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data
      } else {
        localStorage.setItem('user', this.username)
        localStorage.setItem('userType', 'usuario')
        toast('Registrado exitosamente, redirigiendo')
        router.push('/')
      }
    },
    async registrateUsuario(input: any) {
      return await fetch('http://localhost:8080/usuario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    }
  }
}
</script>
