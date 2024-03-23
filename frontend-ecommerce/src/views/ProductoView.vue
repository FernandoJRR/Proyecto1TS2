<template>
  <v-container align="center">
    <v-row style="margin-bottom: 3vh">
      <v-col>
        <v-btn
          v-if="userType == 'admin'"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          to="/autorizar"
          >Ir a listado</v-btn
        >
        <v-btn
          v-else-if="userType == 'usuario'"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          @click="volver"
          >Volver</v-btn
        >
      </v-col>
      <v-col>
        <h2 style="font-family: 'Monaco', monospace; color: #fcd667" v-if="!isFetchingProduct">
          {{ producto.es_servicio ? 'Servicio' : 'Producto' }}
        </h2>
        <h1 v-if="!isFetchingProduct" style="font-family: 'Monaco', monospace; color: #fcd667">
          {{ producto.nombre }}
        </h1>
      </v-col>
      <v-col>
        <h3 style="font-family: 'Monaco', monospace; color: #fcd667">Precio:</h3>
        {{ isFetchingProduct ? 0 : producto.precio }} Cacao
        <br />
        <br />
        <v-container v-if="!isFetchingProduct && producto.usuario_vendedor != username">
          <h4 v-if="producto.usuario_comprador == null">Disponible</h4>
          <h4 v-else>No Disponible</h4>
          <br />
          <v-container v-if="userType == 'usuario'">
            <v-btn
              v-if="producto.usuario_comprador == null"
              variant="outlined"
              prepend-icon="mdi-cart-outline"
              color="success"
              @click="comprar"
            >
              {{ producto.es_servicio ? 'Contratar' : 'Comprar' }}
            </v-btn>
            <v-btn v-else variant="outlined" prepend-icon="mdi-cart-outline" color="red" disabled>
              No Disponible
            </v-btn>
            <h5 style="font-family: 'Monaco', monospace; color: #fcd667">Balance de Cuenta:</h5>
            <h5 v-if="!isFetchingProfile">{{ cuenta.balance }}</h5>
          </v-container>
        </v-container>
        <v-container v-else>
          <h4 v-if="!isFetchingProduct && producto.usuario_comprador == null">En Venta</h4>
          <h4 v-else>Comprado</h4>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-img
          v-if="!isFetchingProduct && !isFetchingImage"
          :src="imagen_producto"
          width="300"
        ></v-img>
      </v-col>
      <v-col cols="5">
        <h2 style="font-family: 'Monaco', monospace; color: #fcd667" v-if="!isFetchingProduct">
          Descripcion:
        </h2>
        <p v-if="!isFetchingProduct" style="margin-bottom: 3vh">{{ producto.descripcion }}</p>
      </v-col>
    </v-row>
    <br />
    Publicado por: {{ isFetchingProduct ? '' : producto.usuario_vendedor }} el
    {{ isFetchingProduct ? '' : producto.fecha_publicacion }}
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import router from '@/router'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    isFetchingProduct: true,
    isFetchingProfile: true,
    isFetchingImage: true,

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),
    user: ref(),
    cuenta: ref(),

    detalle: '',

    producto: ref(),
    imagen_producto: ''
  }),
  methods: {
    async comprar() {
      if (this.producto.precio > this.cuenta.balance) {
        toast('No cuentas con los fondos para comprar este producto')
        return
      }

      const response = await this.buyProduct(this.producto.id, { usuario_comprador: this.username })
      const data = await response.json()

      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        toast(data)
      } else {
        toast('Producto comprado exitosamente')
        this.getProducto()
          .then((response) => response.json())
          .then((data) => {
            this.producto = data
            this.isFetchingProduct = false

            this.getPublicationImage(this.producto.id)
              .then((response) => response.json())
              .then((data) => {
                this.imagen_producto = data
                this.isFetchingImage = false
              })
          })

        if (this.username == null) {
          return
        } else {
          this.getPerfil()
            .then((response) => response.json())
            .then((data) => {
              this.user = data
              this.cuenta = data.cuenta
              this.isFetchingProfile = false
            })
        }
      }
    },
    async buyProduct(id_producto: number, input: any) {
      return await fetch(`http://localhost:8080/producto-servicio/comprar/${id_producto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    async getProducto() {
      return await fetch(`http://localhost:8080/producto-servicio/${this.$route.params.id}`, {
        method: 'GET'
      })
    },
    async getPerfil() {
      return await fetch(`http://localhost:8080/usuario/${this.username}`, {
        method: 'GET'
      })
    },
    async getPublicationImage(id_producto: number) {
      return await fetch(`http://localhost:8080/producto-servicio/imagen/${id_producto}`, {
        method: 'GET'
      })
    },
    volver() {
      router.go(-1)
    }
  },
  async created() {
    this.getProducto()
      .then((response) => response.json())
      .then((data) => {
        this.producto = data
        this.isFetchingProduct = false

        this.getPublicationImage(this.producto.id)
          .then((response) => response.json())
          .then((data) => {
            this.imagen_producto = data
            this.isFetchingImage = false
          })
      })

    if (this.username == null) {
      return
    } else {
      this.getPerfil()
        .then((response) => response.json())
        .then((data) => {
          this.user = data
          this.cuenta = data.cuenta
          this.isFetchingProfile = false
        })
    }
  }
}
</script>
