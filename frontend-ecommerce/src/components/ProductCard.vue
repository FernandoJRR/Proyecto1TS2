<template>
  <v-card elevation="16" variant="tonal" :to="`/producto/${id}`">
    <v-card-item>
      <v-card-title>{{ tipo }} | {{ nombre }}</v-card-title>

      <v-card-subtitle>{{ precio }} Cacao</v-card-subtitle>
    </v-card-item>

    <v-card-text>Publicado por: {{ vendedor }}, {{ fecha_publicacion }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import router from '@/router'

export default {
  props: {
    id: { type: Number, required: true },
    tipo: String,
    nombre: String,
    precio: Number,
    vendedor: String,
    fecha_publicacion: String
  },
}
</script>
