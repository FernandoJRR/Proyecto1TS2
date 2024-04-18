<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      <v-icon icon="mdi-account" /> Perfil de {{ username }}
    </h1>
    <v-text-field
      v-model="user_data.nombre"
      label="Nombre"
      prepend-icon="mdi-account"
      variant="outlined"
      style="width: 50%"
      :loading="isFetching"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="user_data.username"
      label="Username"
      prepend-icon="mdi-account"
      variant="outlined"
      style="width: 50%"
      :loading="isFetching"
      disabled
    ></v-text-field>

    <v-form ref="form" @submit.prevent="cambiarPassword">
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
      <v-btn @click="cambiarPassword">Cambiar Password</v-btn>
    </v-form>
    <br />
    <br />
    <v-container v-if="userType == 'usuario'">
      <v-row>
        <v-col>
          <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
            <img src="@/assets/cacao.png" width="30" /> Balance de Cuenta Cacao:
            <p v-if="isFetching" style="display: inline">...</p>
            <p v-else style="display: inline">{{ cuenta_data.balance_cacao }}</p>
          </h1>
        </v-col>
        <v-col>
          <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
            <img src="@/assets/cacao.png" width="30" /> Balance de Cuenta Puntos:
            <p v-if="isFetching" style="display: inline">...</p>
            <p v-else style="display: inline">{{ cuenta_data.balance_puntos }}</p>
          </h1>
        </v-col>
      </v-row>
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <v-icon icon="mdi-account" /> Ultimas Transacciones:
      </h1>
      <v-table theme="dark">
        <thead>
          <tr>
            <th class="text-left">Fecha Transaccion</th>
            <th class="text-left">Monto Cacao</th>
            <th class="text-left">Balance de Cacao</th>
            <th class="text-left">Monto Puntos</th>
            <th class="text-left">Balance de Puntos</th>
            <th class="text-left">Motivo de Transaccion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in transacciones_usuario" :key="item.id">
            <td>{{ item.fecha_transaccion }}</td>
            <td>{{ item.monto_cacao }}</td>
            <td>{{ item.balance_cacao }}</td>
            <td>{{ item.monto_puntos }}</td>
            <td>{{ item.balance_puntos }}</td>
            <td>{{ item.motivo }}</td>
          </tr>
        </tbody>
      </v-table>
      <br />
      <br />
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <v-icon icon="mdi-account" /> Productos y Servicios Publicados
      </h1>

      <v-table theme="dark">
        <thead>
          <tr>
            <th class="text-left">Tipo</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Vendedor</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Fecha de Publicacion</th>
            <th class="text-left">Fecha de Autorizacion</th>
            <th class="text-left">Comprador</th>
            <th class="text-left">Fecha de Compra</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos_publicados" :key="item.id">
            <td>{{ item.es_servicio ? 'Servicio' : 'Producto' }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.usuario_vendedor }}</td>
            <td>{{ item.precio }}</td>
            <td>{{ item.fecha_publicacion }}</td>
            <td>
              {{
                item.fecha_autorizacion == null
                  ? 'Pendiente de autorizacion'
                  : item.fecha_autorizacion
              }}
            </td>
            <td>{{ item.usuario_comprador == null ? '' : item.usuario_comprador }}</td>
            <td>{{ item.fecha_compra == null ? '' : item.fecha_compra }}</td>
            <td>
              <v-btn variant="plain" @click="verProducto(item.id)">ver</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <br />
      <br />
      <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
        <v-icon icon="mdi-account" /> Productos y Servicios Comprados
      </h1>

      <v-table theme="dark">
        <thead>
          <tr>
            <th class="text-left">Tipo</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Vendedor</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Fecha de Publicacion</th>
            <th class="text-left">Fecha de Compra</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos_comprados" :key="item.id">
            <td>{{ item.es_servicio ? 'Servicio' : 'Producto' }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.usuario_vendedor }}</td>
            <td>{{ item.precio }}</td>
            <td>{{ item.fecha_publicacion }}</td>
            <td>{{ item.fecha_compra == null ? '' : item.fecha_compra }}</td>
            <td>
              <v-btn variant="plain" @click="verProducto(item.id)">ver</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
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

    show: false,
    password: '',
    passwordRules: [(value: any) => !!value || 'Password requerido!'],
    password_rewrite: '',
    passwordRewriteRules: [(value: any) => !!value || 'Password requerido!'],
    detalle: '',
    user: ref(),
    cuenta: ref(),

    productos_publicados: ref(),
    productos_comprados: ref(),
    transacciones_usuario: ref()
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
    }
  },

  methods: {
    async cambiarPassword() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      if (this.password != this.password_rewrite) {
        this.detalle = 'Las password no coinciden'
      }

      const response = await this.changePassword({
        username: this.username,
        password: this.password
      })
      const data = await response.json()
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data
      } else {
        this.detalle = ''
        ;(this.$refs.form as any).reset()
        toast(data, { position: toast.POSITION.BOTTOM_CENTER })
      }
    },
    verProducto(id_producto: number) {
      router.push('producto/' + id_producto)
    },
    async changePassword(input: any) {
      return await fetch(`http://localhost:8080/usuario/change-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async getPerfil() {
      return await fetch(`http://localhost:8080/usuario/${this.username}`, {
        method: 'GET'
      })
    },
    async getTransaccionesUsuario() {
      return await fetch(`http://localhost:8080/transacciones/${this.username}`, {
        method: 'GET'
      })
    },
    async getPublicacionesUsuario() {
      return await fetch(
        `http://localhost:8080/producto-servicio/publicaciones-usuario/${this.username}`,
        {
          method: 'GET'
        }
      )
    },
    async getCompradoUsuario() {
      return await fetch(
        `http://localhost:8080/producto-servicio/comprado-usuario/${this.username}`,
        {
          method: 'GET'
        }
      )
    }
  },
  async created() {
    this.getPerfil()
      .then((response) => response.json())
      .then((data) => {
        this.user = data
        this.cuenta = data.cuenta
        this.isFetching = false
      })

    this.getPublicacionesUsuario()
      .then((response) => response.json())
      .then((data) => {
        this.productos_publicados = data
      })

    this.getCompradoUsuario()
      .then((response) => response.json())
      .then((data) => {
        this.productos_comprados = data
      })

    this.getTransaccionesUsuario()
      .then((response) => response.json())
      .then((data) => {
        this.transacciones_usuario = data
      })
  }
}
</script>
