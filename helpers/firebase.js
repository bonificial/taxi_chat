const firebase = require('firebase');
const firebaseConfig = {

    apiKey: "AIzaSyBLt3ZEdpT0gBRBUGuh34aUPTED4jb7wwI",
    databaseURL: "https://hwwk-bigat.firebaseio.com/",
    storageBucket: "gs://hwwk-bigat.appspot.com"
};//
  const initializeFirebaseDB = () => {

    var app = null;
    if (!firebase.apps.length) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase;
    }
console.log('Firebase db Initialised')
    return (app.database());
}
module.exports = {initializeFirebaseDB}