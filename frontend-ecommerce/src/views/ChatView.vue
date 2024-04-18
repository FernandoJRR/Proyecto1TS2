<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">Chats</h1>

    <v-row>
      <v-col cols="4">
        Listado de chats
        <v-container v-if="isFetchingLista">Cargando chats...</v-container>
        <v-container v-else>
          <v-card
            v-for="chat in listadoChats"
            :key="chat.id"
            variant="tonal"
            density="compact"
            @click="
              abrirChat(
                chat.id,
                chat.id_usuario_1 == username ? chat.id_usuario_2 : chat.id_usuario_1
              )
            "
            :color="
              chat.id == chatActual
                ? '#fad667'
                : chat.mensaje.length > 0
                  ? !chat.mensaje[0].visto && chat.mensaje[0].id_usuario_receptor == username
                    ? '#316e2d'
                    : '#ffffff'
                  : '#a24a32'
            "
            style="margin-bottom: 1%;"
          >
            <v-card-item>
              <v-card-title class="text-left" style="font-size: 120%">
                {{ chat.id_usuario_1 == username ? chat.id_usuario_2 : chat.id_usuario_1 }} |
                {{ chat.producto_servicio.nombre }}
              </v-card-title>
            </v-card-item>
            <v-row>
              <v-col cols="7">
                <v-card-text style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  {{ chat.mensaje.length > 0 ? chat.mensaje[0].contenido : 'Envia un mensaje' }}
                </v-card-text>
              </v-col>
              <v-col>
                <v-card-text>
                  {{ chat.mensaje.length > 0 ? formatDate(chat.mensaje[0].fecha_envio) : '' }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
      <v-col>
        <v-sheet
          border="sm"
          class="text-white mx-auto"
          color="#282828"
          min-width="400"
          min-height="400"
          max-height="400"
        >
          <p v-if="!chatActual" style="margin-top: 12em">Selecciona un chat</p>
          <v-container v-else>
            <v-virtual-scroll :items="mensajesActuales" height="310" style="margin-bottom: -34%">
              <template v-slot:default="{ item }">
                <v-card
                  :color="(item as any).id_usuario_emisor == username ? '#fad667' : '#ffffff'"
                  :style="
                    (item as any).id_usuario_emisor == username
                      ? 'margin-bottom: 1%; width: 75%; margin-left: 25%;'
                      : 'margin-bottom: 1%; width: 75%; margin-right: 25%;'
                  "
                >
                  <v-row>
                    <v-col cols="10">
                      {{ (item as any).contenido }}
                    </v-col>
                    <v-col>
                      {{ formatDate((item as any).fecha_envio) }}
                    </v-col>
                  </v-row>
                </v-card>
              </template>
            </v-virtual-scroll>
            <v-form ref="formEnviar" @submit.prevent="enviarMensaje">
              <v-row style="margin-top: 16em">
                <v-col cols="10">
                  <v-text-field v-model="mensajeEnviar" label="Mensaje"> </v-text-field>
                </v-col>
                <v-col>
                  <v-btn icon="mdi-send" @click="enviarMensaje" />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-sheet>
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
    isFetchingLista: true,

    mensajeEnviar: '',

    listadoChats: ref(),

    chatActual: ref(),
    receptorActual: ref(),
    mensajesActuales: ref(),

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref()
  }),
  methods: {
    formatDate(dateString: string) {
      const date = new Date(dateString)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },
    async enviarMensaje() {
      const response = await this.sendMessage({
        id_usuario_emisor: this.username,
        id_usuario_receptor: this.receptorActual,
        contenido: this.mensajeEnviar,
        fecha_envio: new Date(),
        visto: false,
        id_chat: this.chatActual
      })
      const data = await response.json()

      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        toast(data)
      } else {
        this.mensajesActuales.push(data)
        this.mensajeEnviar = ''
      }
    },
    async abrirChat(id_chat: number, receptor: string) {
      this.getMensajesChat(id_chat)
        .then((response) => response.json())
        .then((data) => {
          this.mensajesActuales = data

          //El mensaje se marca como visto si el emisor NO es el usuario actual y si NO se ha visto aun
          if (
            this.mensajesActuales[this.mensajesActuales.length - 1].id_usuario_emisor !=
            this.username
          ) {
            if (!this.mensajesActuales[this.mensajesActuales.length - 1].visto) {
              this.verMensajes(this.mensajesActuales[this.mensajesActuales.length - 1].id).then(
                () => {}
              )
            }
          }
        })

      this.chatActual = id_chat
      this.receptorActual = receptor
    },
    async sendMessage(input: any) {
      return await fetch(`http://localhost:8080/chats/enviar-mensaje`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async verMensajes(id_mensaje: number) {
      return await fetch(`http://localhost:8080/chats/ver-mensaje/${id_mensaje}`, {
        method: 'PATCH'
      })
    },
    async getMensajesChat(id_chat: number) {
      return await fetch(`http://localhost:8080/chats/mensajes-chat/${id_chat}`, {
        method: 'GET'
      })
    },
    async getChatsUsuario() {
      return await fetch(`http://localhost:8080/chats/chats-usuario/${this.username}`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getChatsUsuario()
      .then((response) => response.json())
      .then((data) => {
        this.listadoChats = data
        this.isFetchingLista = false
      })
  }
}
</script>
