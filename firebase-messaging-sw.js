

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyBcoHFA4REoKb3y2M4s6Zypqbt6JAof1KA",
    authDomain: "swsu-8aeff.firebaseapp.com",
    databaseURL: "https://swsu-8aeff-default-rtdb.firebaseio.com",
    projectId: "swsu-8aeff",
    storageBucket: "swsu-8aeff.appspot.com",
    messagingSenderId: "648956499485",
    appId: "1:648956499485:web:ff2ce2fd361f294eeb58f4",
    measurementId: "G-2PDQY9WBQD"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});