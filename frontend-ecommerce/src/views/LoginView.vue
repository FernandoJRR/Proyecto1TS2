<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <img src="@/assets/cacao.png" width="30" /> k’ayb’äl - login
      <img src="@/assets/cacao.png" width="30" />
    </h1>
    <a href="/">
      <v-btn style="margin-left: -50%; margin-top: -10%" to="/" variant="text"
        ><v-icon icon="mdi-arrow-left" />Ir al Inicio</v-btn
      >
    </a>
    <v-form ref="form" @submit.prevent="submit">
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
      <v-btn type="submit">Login</v-btn>
      <h3 style="color: red">{{ detalle }}</h3>
      <br />
      <h3>
        Si no tienes una cuenta aun puedes crearla <router-link to="/registro">aqui!</router-link>
      </h3>
    </v-form>
  </v-container>
</template>
<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { ref } from 'vue'

export default {
  data: () => ({
    show: false,
    username: '',
    usernameRules: [(value: any) => !!value || 'Username requerido!'],
    password: '',
    passwordRules: [(value: any) => !!value || 'Password requerido!'],
    detalle: '',
  }),
  methods: {
    async submit() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      
      const response = await this.validateUsuario(this.username, this.password);
      const data = await response.json();
      
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data;
      } else {
        localStorage.setItem('user', this.username)
        switch (data.tipoUsuario.codigo) {
          case 'admin':
            localStorage.setItem('userType', 'admin')
            router.push('/')
            break
          case 'usuario':
            localStorage.setItem('userType', 'usuario')
            router.push('/')
            break
        }
      }
    },
    async validateUsuario(username:string, password:string) 
    {
      return await fetch(
        "http://localhost:8080/usuario/validate",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            username: username,
            password: password
          }),
        }
      );
    }
  }
}
</script>
