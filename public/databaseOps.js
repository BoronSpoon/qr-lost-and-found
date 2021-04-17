var vars = {}; // stores global variable

function addUser(userId, userName, email){
    var data = {
        'email': email,
        'name': userName
    };
    vars.userId = userId;
    userCredentials.add(data);
    userPreferences.init();
}

userCredentials = {
    'get': async function () {
        return firebase.database().ref('userCredentials/'+vars.userId).get().then((snapshot) => {
            return snapshot.val();
        }); // return promise
    },
    'add': function (data) {
        firebase.database().ref('userCredentials/'+vars.userId).set(data);
    },
    'set': function (data) {
        firebase.database().ref('userCredentials/'+vars.userId).set(data);
    }
};

userPreferences = {
    'get': async function () {
        return firebase.database().ref('userPreferences/'+vars.userId).get().then((snapshot) => {
            return snapshot.val();
        }); // returns promise
    },
    'init': function () {    
        var data = {
            'notifyAtLinkOpen': false,
            'notifyNotLostItem': true,
            'whereToNotify': 'email'
        };
        firebase.database().ref('userPreferences/'+vars.userId).set(data);
    },
    'set': function (data) {
        firebase.database().ref('userPreferences/'+vars.userId).set(data);
    }
};

itemIds = {
    'get': async function (itemId) {
        return firebase.database().ref('itemIds/'+itemId).get().then((snapshot) => {
            return snapshot.val();
        }); // returns promise
    },
    'set': function (itemId) {
        firebase.database().ref('itemIds/'+itemId).set(vars.userId);
    }
};

items = {
    'get': async function (itemId) {
        return firebase.database().ref('items/'+vars.userId+'/'+itemId).get().then((snapshot) => {
            return snapshot.val();
        }); // returns promise
    },
    'getList': async function () {
        return firebase.database().ref('items/'+vars.userId).orderByKey().once('value').then((snapshot) => {
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
    'set': function (itemId, data) {
        firebase.database().ref('items/'+vars.userId+'/'+itemId).set(data);
    },
    'update': function (itemId, data) {
        console.log('items/'+vars.userId+'/'+itemId, data);
        firebase.database().ref('items/'+vars.userId+'/'+itemId).update(data);
    },
    'push': function (data) {
        var itemId = firebase.database().ref('items/'+vars.userId).push(data).key;
        return itemId;
    }
};

messages = {
    'get': async function (messageId) {
        return firebase.database().ref('messages/'+vars.userId+'/'+messageId).get().then((snapshot) => {
            return snapshot.val();
        }); // return promise
    },
    'set': function (messageId, data) {
        firebase.database().ref('messages/'+'/'+vars.userId+'/'+messageId).set(data);
    },
    'push': function (data) {
        var messageId = firebase.database().ref('messages/'+vars.userId).push(data).key;
        return messageId;
    }
};
