import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD1gICuxigJ1k3dt9BK4hLH19t2Oy4mLiY",
    authDomain: "eseva-befff.firebaseapp.com",
    databaseURL: "https://eseva-befff.firebaseio.com",
    projectId: "eseva-befff",
    storageBucket: "eseva-befff.appspot.com",
    messagingSenderId: "614707287849",
    appId: "1:614707287849:web:feb08fdc2205e366c9c938"
}

firebase.initializeApp(config);

export default firebase;