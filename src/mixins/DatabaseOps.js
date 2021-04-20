import Vue from 'vue'

export default {
    methods: {
        // User Credentials
        async getUserCredentials() {
            return firebase.database().ref('userCredentials/'+Vue.prototype.$userId).get().then((snapshot) => {
                return snapshot.val();
            }); // return promise
        },
        addUserCredentials(data) {
            firebase.database().ref('userCredentials/'+Vue.prototype.$userId).set(data);
        },
        setUserCredentials(data) {
            firebase.database().ref('userCredentials/'+Vue.prototype.$userId).set(data);
        },

        // User Preferences
        async getUserPreferences() {
            return firebase.database().ref('userPreferences/'+Vue.prototype.$userId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        initUserPreferences() {    
            var data = {
                'notifyAtLinkOpen': false,
                'notifyNotLostItem': true,
                'whereToNotify': 'email'
            };
            firebase.database().ref('userPreferences/'+Vue.prototype.$userId).set(data);
        },
        setUserPreferences(data) {
            firebase.database().ref('userPreferences/'+Vue.prototype.$userId).set(data);
        },

        // ItemIds
        async getItemIds(itemId) {
            return firebase.database().ref('itemIds/'+itemId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        setItemIds(itemId) {
            firebase.database().ref('itemIds/'+itemId).set(Vue.prototype.$userId);
        },

        // Items
        async getItems(itemId) {
            return firebase.database().ref('items/'+Vue.prototype.$userId+'/'+itemId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        async getAllItems() {
            return firebase.database().ref('items/'+Vue.prototype.$userId).orderByKey().once('value').then((snapshot) => {
                data = [];
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // timestamp
                    var childData = childSnapshot.val(); // data for item
                    childData.itemId = key;
                    data.push(childData); 
                });
                return data;
            }); 
        },
        setItems(itemId, data) {
            firebase.database().ref('items/'+Vue.prototype.$userId+'/'+itemId).set(data);
        },
        updateItems(itemId, data) {
            console.log('items/'+Vue.prototype.$userId+'/'+itemId, data);
            firebase.database().ref('items/'+Vue.prototype.$userId+'/'+itemId).update(data);
        },
        pushItems(data) {
            var itemId = firebase.database().ref('items/'+Vue.prototype.$userId).push(data).key;
            return itemId;
        },

        // Messages
        async getMessages(messageId) {
            return firebase.database().ref('messages/'+Vue.prototype.$userId+'/'+messageId).get().then((snapshot) => {
                return snapshot.val();
            }); // return promise
        },
        setMessages(messageId, data) {
            firebase.database().ref('messages/'+Vue.prototype.$userId+'/'+messageId).set(data);
        },
        pushMessages(data) {
            var messageId = firebase.database().ref('messages/'+Vue.prototype.$userId).push(data).key;
            return messageId;
        }
    }
}