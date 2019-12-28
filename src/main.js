import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyAgpBOzB7duHCeyRhntNxF1NrQUeR0IKb4",
  authDomain: "hoad-site-project.firebaseapp.com",
  databaseURL: "https://hoad-site-project.firebaseio.com",
  projectId: "hoad-site-project",
  storageBucket: "hoad-site-project.appspot.com",
  messagingSenderId: "355390191307",
  appId: "1:355390191307:web:d9c5e1f9db881c5d8ccd4e",
  measurementId: "G-2CZ0ZTP040"
});

let app = null;

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if (!app) {

    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
})

export const db = firebase.firestore();
export const storage = firebase.storage();