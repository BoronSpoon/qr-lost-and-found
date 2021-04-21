<template>
  <div>
    <Header :title="title"/>
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
    title: 'Main Menu'
  }),
};
</script>
