<template>
  <div>
    <Header :title="headerTitle"/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: "MainMenu",
  components: {
    Header
  },
  data: () => ({
    headerTitle: "Main Menu"
  }),
};
</script>
