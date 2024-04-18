<template>
  <v-card elevation="16" variant="tonal" :to="`/producto/${id}`" width="">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-text style="margin-top: -2%; margin-bottom: -4%;">
          <v-chip>{{ categoria }}</v-chip><v-chip v-if="disponible_trueque">Disponible por Trueque</v-chip>
        </v-card-text>
        <v-card-title class="text-h5"> {{ tipo }} | {{ nombre }} </v-card-title>
        <v-card-subtitle>{{ precio }} Cacao</v-card-subtitle>
        <v-card-text> Publicado por: {{ vendedor }}, {{ fecha_publicacion }} </v-card-text>
      </div>

      <v-avatar class="ma-3" rounded="0" size="125">
        <v-img v-if="!isFetching" :src="imagen_publicacion"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
export default {
  data: () => ({
    imagen_publicacion: '',
    isFetching: true
  }),
  props: {
    id: { type: Number, required: true },
    tipo: String,
    nombre: String,
    precio: Number,
    vendedor: String,
    fecha_publicacion: String,
    ruta_imagen: String,
    categoria: String,
    disponible_trueque: Boolean,
  },
  methods: {
    async getPublicationImage(id_producto: number) {
      return await fetch(`http://localhost:8080/producto-servicio/imagen/${id_producto}`, {
        method: 'GET'
      })
    }
  },
  async created() {
    this.getPublicationImage(this.id)
      .then((response) => response.json())
      .then((data) => {
        this.imagen_publicacion = data
        this.isFetching = false
      })
  }
}
</script>
