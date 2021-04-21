<template>
  <!-- authentication -->
  <div id="userAuthentication" style="display:block">
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
import Vue from 'vue'
import DatabaseOps from '@/mixins/DatabaseOps'

export default {
  name: "Authentication",
  mounted () {
    this.loginScreen();
  },
  methods: {
    // I wanted to include this in a javascript file, but vue router cannot be called outside /src
    loginScreen (){
      // FirebaseUI config.
      var uiConfig = {
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],    
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            Vue.prototype.$userId = authResult.user.uid;
            if (authResult.additionalUserInfo.isNewUser){ // if new user, register to database
              this.addUser(authResult.user.displayName, authResult.user.email)
            }
            document.getElementById('userAuthentication').style.display = 'none';
            this.$router.push("/MainMenu");
            return false;
          },
          uiShown: () => {
            document.getElementById('loader').style.display = 'none';
          },
        },
      };
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    },    
    addUser(userName, email){
        var data = {
            'email': email,
            'name': userName
        };
        this.addUserCredentials(data);
        this.initUserPreferences();
    },
  },
  data: () => ({
    //
  }),
  mixins: [DatabaseOps]
};
</script>
