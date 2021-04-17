<template>
  <!-- authentication -->
  <div id="userAuthentication" style="display:block">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "Authentication",
  mounted () {
    loginScreen();
  },
  data: () => ({
    //
  }),
};
</script>
