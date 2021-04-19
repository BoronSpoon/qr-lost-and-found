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
        <v-app-bar-nav-icon @click="showDrawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
    </v-card>
    <Drawer :show="showDrawer"/>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'

export default {
  name: "Header",
  components: {
    Drawer
  },
  props: {
    title: String,
  },
  data: () => ({
    showDrawer: false
  }),
};
</script>
