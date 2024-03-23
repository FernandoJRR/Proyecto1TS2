<template>
  <v-container align="center">
    <h1 style="font-family: 'Monaco', monospace; color: #fcd667; margin-bottom: 3vh">
      Publicar Producto o Servicio
    </h1>

    <v-form ref="form" @submit.prevent="publicar">
      <v-select
        v-model="tipoPublicacion"
        :rules="tipoPublicacionRules"
        label="Tipo"
        :items="['Producto', 'Servicio']"
        style="width: 75%"
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
      <v-row justify="center">
        <v-col cols="5">
          <v-file-input @change="uploadImage" label="Imagen producto" />
        </v-col>
        <v-col cols="5">
          <v-img :src="imagen" width="300" cover />
        </v-col>
      </v-row>
      <br v-if="imagen != ''" />
      <v-btn @click="publicar">Registrar Producto</v-btn>
      <h3 style="color: red">{{ detalle }}</h3>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import mockdata from '@/assets/mockdata.json'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export default {
  data: () => ({
    isFetching: true,

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

    user: ref(localStorage.getItem('user')),
    cuenta: ref(),

    taza_cambio: ref(mockdata.tipo_cambio.cacao_por_quetzal),

    imagen: ''
  }),
  methods: {
    async publicar() {
      const { valid } = await (this.$refs.form as any).validate()
      if (!valid) return
      const response = await this.createPublicacion({
        es_servicio: this.tipoPublicacion == 'Producto' ? false : true,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        imagen: this.imagen,
        usuario_vendedor: this.user
      })
      const data = await response.json()
      //Se comprueba si las credenciales son correctas
      if (response.status != 200) {
        this.detalle = data
      } else {
        ;(this.$refs.form as any).reset()
        if (data.fecha_autorizacion != null) toast('Producto registrado y autorizado exitosamente')
        else toast('Producto registrado exitosamente')
      }
    },
    async createPublicacion(input: any) {
      return await fetch(`http://localhost:8080/producto-servicio/`, {
        method: 'POST',
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
    }
  },
  async created() {
    this.cuenta = ref(mockdata.cuentas[this.user as keyof typeof mockdata.cuentas])
    this.isFetching = false
  }
}
</script>
