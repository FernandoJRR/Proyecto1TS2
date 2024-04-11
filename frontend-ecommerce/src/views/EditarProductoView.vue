<template>
  <v-container align="center">
    <v-row style="margin-bottom: 3vh">
      <v-col cols="2">
        <v-btn variant="outlined" prepend-icon="mdi-arrow-left" @click="volver">Volver</v-btn>
      </v-col>
      <v-col cols="8">
        <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
          Editar Producto o Servicio
        </h1>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="5"> </v-col>
    </v-row>
    <v-form ref="form" @submit.prevent="editar">
      <v-select
        v-model="tipoPublicacion"
        :rules="tipoPublicacionRules"
        label="Tipo"
        :items="['Producto', 'Servicio']"
        style="width: 75%"
        disabled
      />
      <v-text-field
        v-model="nombre"
        :rules="nombreRules"
        label="Nombre"
        variant="outlined"
        style="width: 75%"
        required
      ></v-text-field>
      <v-textarea
        v-model="descripcion"
        :rules="descripcionRules"
        label="Descripcion"
        variant="outlined"
        style="width: 75%"
        required
      ></v-textarea>
      <v-text-field
        v-model="precio"
        :rules="precioRules"
        label="Precio"
        variant="outlined"
        type="number"
        style="width: 75%"
        required
      ></v-text-field>
      <v-file-input @change="uploadImage" label="Imagen producto" style="width: 75%" />
      <v-row justify="center">
        <v-col cols="5">
          <h3>Imagen Actual</h3>
          <v-img
            v-if="!isFetchingProduct && !isFetchingImage"
            :src="imagen_producto"
            width="300"
          ></v-img>
        </v-col>
        <v-col v-if="imagen != ''" cols="5">
          <h3>Nueva Imagen</h3>
          <v-img :src="imagen" width="300" cover />
        </v-col>
      </v-row>
      <br />
      <v-btn @click="editar">Actualizar</v-btn>
      <h3 style="color: red">{{ detalle }}</h3>
    </v-form>
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

    tipoPublicacion: '',
    tipoPublicacionRules: [(value: any) => !!value || 'Tipo de publicacion requerido!'],
    nombre: '',
    nombreRules: [(value: any) => !!value || 'Nombre requerido!'],
    descripcion: '',
    descripcionRules: [(value: any) => !!value || 'Descripcion requerida!'],
    precio: 0,
    precioRules: [
      (value: any) => !!value || 'Precio requerido',
      (value: any) => value > 0 || 'El precio ingresado no es valido'
    ],
    detalle: '',

    username: localStorage.getItem('user'),
    userType: localStorage.getItem('userType'),

    producto: ref(),
    imagen_producto: '',
    imagen: ''
  }),
  methods: {
    async editar() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      const response = await this.updatePublicacion({
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imagen
      })
      const data = await response.json()
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data
      } else {
        toast('Producto actualizado exitosamente')
        await (this.$refs.form as any).reset()
        this.imagen = ''

        this.getProducto()
          .then((response) => response.json())
          .then((data) => {
            this.producto = data
            this.tipoPublicacion = this.producto.es_servicio ? 'Servicio' : 'Producto'
            this.nombre = this.producto.nombre
            this.descripcion = this.producto.descripcion
            this.precio = this.producto.precio
            this.isFetchingProduct = false

            this.getPublicationImage(this.producto.id)
              .then((response) => response.json())
              .then((data) => {
                this.imagen_producto = data
                this.isFetchingImage = false
              })
          })
      }
    },
    async updatePublicacion(input: any) {
      return await fetch(`http://localhost:8080/producto-servicio/editar/${this.producto.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
    },
    uploadImage(event: any) {
      const HEIGHT = 400
      const QUALITY = 5 //Este valor es un porcentaje desde 1 a 100
      let fileSelect = event.target.files
      if (fileSelect.length > 0) {
        let file = fileSelect[0]
        let fileReader = new FileReader()
        fileReader.onload = (FileLoadEvent) => {
          let result = FileLoadEvent.target!.result
          console.log(result)
          let img: any = document.createElement('img')
          img.src = result
          img.onload = (event: any) => {
            let canvas = document.createElement('canvas')
            let ratio = HEIGHT / event.target.height
            canvas.height = HEIGHT
            canvas.width = event.target.width * ratio
            const context = canvas.getContext('2d')
            context!.drawImage(img, 0, 0, canvas.width, canvas.height)
            let new_img_url = context!.canvas.toDataURL('image/jpeg', QUALITY)
            this.imagen = new_img_url
          }
        }
        fileReader.readAsDataURL(file)
      }
    },
    async getProducto() {
      return await fetch(`http://localhost:8080/producto-servicio/${this.$route.params.id}`, {
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
        this.tipoPublicacion = this.producto.es_servicio ? 'Servicio' : 'Producto'
        this.nombre = this.producto.nombre
        this.descripcion = this.producto.descripcion
        this.precio = this.producto.precio
        this.isFetchingProduct = false

        this.getPublicationImage(this.producto.id)
          .then((response) => response.json())
          .then((data) => {
            this.imagen_producto = data
            this.isFetchingImage = false
          })
      })
  }
}
</script>
