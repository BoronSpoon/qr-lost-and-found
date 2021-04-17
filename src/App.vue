<template>
  <v-app>
    <v-main>
      <Authentication />
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";
import Authentication from "./views/Authentication";

export default {
  name: "App",

  components: {
    Authentication,
  },
  data: () => ({
    //
  }),
};
</script>
