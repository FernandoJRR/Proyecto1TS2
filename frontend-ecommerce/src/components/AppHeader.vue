<template>
  <v-container class="mt-5">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-left: 15em">
      <router-link to="/" style="text-decoration: none; color: #fcd667">
        <img src="@/assets/cacao.png" width="30" /> k’ayb’äl
        <img src="@/assets/cacao.png" width="30" />
      </router-link>
    </h1>
    <br />
    <v-btn variant="plain" to="/">Home</v-btn>
    <v-btn v-if="userType == 'admin'" variant="plain" to="/cacao-taza">Taza de Cambio Cacao</v-btn>
    <v-btn v-else-if="userType == 'usuario'" variant="plain" to="/cacao">Comprar Cacao</v-btn>
    <v-btn v-if="userType == 'admin'" variant="plain" to="/autorizar">Autorizar Productos y Servicios</v-btn>
    <v-btn v-else-if="userType == 'usuario'" variant="plain" to="/publicar">Publicar Producto o Servicio</v-btn>
    <v-btn v-if="userType == 'usuario'" variant="plain" to="/chats">Chats</v-btn>
    <v-btn v-if="username == null" variant="plain" style="margin-left: 78%" to="/login">Iniciar Sesion</v-btn>
    <v-container v-else style="display: inline; margin-left: 13%;">
    <v-btn variant="plain" to="/perfil" prepend-icon="mdi-account">{{ username }}</v-btn>
    <v-btn variant="plain" @click="logout">Cerrar Sesion</v-btn>
    </v-container>
    <v-divider />
  </v-container>
</template>
<script lang="ts">
import router from '@/router'
export default {
  data: () => ({
    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
  }),
  methods: {
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      router.go(0);
    }
  }
}
</script>
