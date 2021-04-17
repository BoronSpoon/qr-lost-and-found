function loginScreen (){
    // FirebaseUI config.
    var uiConfig = {
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],    
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                var userId = authResult.user.uid;
                if (authResult.additionalUserInfo.isNewUser){ // if new user, register to database
                    addUser(userId, authResult.user.displayName, authResult.user.email)
                }
                document.getElementById('userAuthentication').style.display = 'none';
                this.$router.push("/MainMenu"); // TBD: router does not work
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
}
    