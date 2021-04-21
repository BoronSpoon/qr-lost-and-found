<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="600"
      tile
    >
      <v-toolbar
        color="deep-purple accent-4"
        dark
      >
        <v-app-bar-nav-icon @click.stop="show = !show"></v-app-bar-nav-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
    </v-card>
    <Drawer :show="show" v-on:update:show="show = $event"/>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'

export default {
  name: "Header",
  components: {
    Drawer
  },
  data: () => ({
    show: false
  }),
  props: {
    title: String,
  },
};
</script>
