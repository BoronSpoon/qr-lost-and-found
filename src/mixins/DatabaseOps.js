export default {
    methods: {
        // User Credentials
        async getUserCredentials() {
            return firebase.database().ref('userCredentials/'+this.$userId).get().then((snapshot) => {
                return snapshot.val();
            }); // return promise
        },
        addUserCredentials(data) {
            firebase.database().ref('userCredentials/'+this.$userId).set(data);
        },
        setUserCredentials(data) {
            firebase.database().ref('userCredentials/'+this.$userId).set(data);
        },

        // User Preferences
        async getUserPreferences() {
            return firebase.database().ref('userPreferences/'+this.$userId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        initUserPreferences() {    
            var data = {
                'notifyAtLinkOpen': false,
                'notifyNotLostItem': true,
                'whereToNotify': 'email'
            };
            firebase.database().ref('userPreferences/'+this.$userId).set(data);
        },
        setUserPreferences(data) {
            firebase.database().ref('userPreferences/'+this.$userId).set(data);
        },

        // ItemIds
        async getItemId(itemId) {
            return firebase.database().ref('itemIds/'+itemId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        setItemId(itemId) {
            firebase.database().ref('itemIds/'+itemId).set(this.$userId);
        },

        // Items
        async getItem(itemId) {
            return firebase.database().ref('items/'+this.$userId+'/'+itemId).get().then((snapshot) => {
                return snapshot.val();
            }); // returns promise
        },
        async getAllItems() {
            return firebase.database().ref('items/'+this.$userId).orderByKey().once('value').then((snapshot) => {
                var data = [];
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // timestamp
                    var childData = childSnapshot.val(); // data for item
                    childData.itemId = key;
                    data.push(childData); 
                });
                return data;
            }); 
        },
        setItem(itemId, data) {
            firebase.database().ref('items/'+this.$userId+'/'+itemId).set(data);
        },
        updateItem(itemId, data) {
            firebase.database().ref('items/'+this.$userId+'/'+itemId).update(data);
        },
        pushItem(data) {
            var itemId = firebase.database().ref('items/'+this.$userId).push(data).key;
            return itemId;
        },

        // Messages
        async getMessage(messageId) {
            return firebase.database().ref('messages/'+this.$userId+'/'+messageId).get().then((snapshot) => {
                return snapshot.val();
            }); // return promise
        },
        async getAllMessages() {
            return firebase.database().ref('messages/'+this.$userId).orderByKey().once('value').then((snapshot) => {
                var data = [];
                snapshot.forEach((childSnapshot) => {
                    var key = childSnapshot.key; // timestamp
                    var childData = childSnapshot.val(); // data for item
                    childData.itemId = key;
                    data.push(childData); 
                });
                return data;
            }); // return promise
        },
        async getMessagesByItem(itemid, messageId) {
            return firebase.database().ref('messages/'+this.$userId).orderByChild('item').equalTo(itemId).get().then((snapshot) => {
                return snapshot.val();
            }); // return promise
        },
        setMessage(messageId, data) {
            firebase.database().ref('messages/'+this.$userId+'/'+messageId).set(data);
        },
        pushMessage(data) {
            var messageId = firebase.database().ref('messages/'+this.$userId).push(data).key;
            return messageId;
        },
        // accessed by visitor
        updatePublicItemData(userId, itemId, data) {
            firebase.database().ref('items/'+userId+'/'+itemId).update(data);
        },
        pushPublicMessage(userId, data) {
            var messageId = firebase.database().ref('messages/'+userId).push(data).key;
            return messageId;
        },
        pushPublicFinder(data) {
            var finderId = firebase.database().ref('finders/').push(data).key;
            return finderId;
        },
        // exists
        async validateItemIdUserId(itemId, userId) {
            return firebase.database().ref('itemIds/'+itemId).get().then((snapshot) => {
                return userId == snapshot.val();
            }); // returns promise
        },
        async validateFinderId(finderId, itemId, userId) {
            return firebase.database().ref('finders/'+finderId).get().then((snapshot) => {
                var value = snapshot.val();
                return value.userId == userId && value.itemId == itemId;
            });
        },
    }
}