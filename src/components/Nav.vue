<template>
  <div class="nav">
    <v-app-bar clipped-right app color="light-blue darken-1" dark>
      <v-toolbar-title color="white">
        <router-link to="/" class="title-link">
          <span class="yellow--text">Ms Hoad</span> English Language and
          Literature
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn v-if="!user" :to="{ name: 'signup' }" text>Signup</v-btn>
      <v-btn v-if="!user" :to="{ name: 'login' }" text>Login</v-btn>
      <span v-if="user">{{ user.email }}</span>
      <v-btn v-if="user" @click="logout" text>Logout</v-btn>
      <v-app-bar-nav-icon
        v-if="user"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-if="user"
      width="500"
      clipped
      color="light-blue darken-2"
      right
      app
      v-model="drawer"
    >
      <v-container>
        <div v-if="this.currentUserYear == 'Teacher'">
          <v-row>
            <v-col>
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn block color="white" v-on="on" :items="dropdown_add">
                    New
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(dropdown, index) in dropdown_add"
                    :key="index"
                    :to="dropdown.link"
                  >
                    <v-list-item-title>{{ dropdown.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col>
            <v-btn block to="/wordbank">
              Word Bank
              <v-icon small>mdi-bookmark</v-icon>
            </v-btn>
          </v-col>
          <!-- <v-col>
            <v-btn block to="games">
              Word Games
              <v-icon small>mdi-gamepad-square</v-icon>
            </v-btn>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col v-for="(yearGroup, index) in yearGroups" :key="index">
            <v-btn
              :to="{ name: 'pages', params: { yearGroup: yearGroup } }"
              block
              text
              dark
              >{{ yearGroup }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      currentUserYear: null,
      dropdown_add: [
        {
          name: "New Page",
          link: "/new-page"
        },
        // {
        //   name: "New Upload",
        //   link: "/new-upload"
        // },
        {
          name: "New Category",
          link: "/new-category"
        }
      ],
      hide_details: false,
      drawer: false,
      yearGroups: []
    };
  },
  created() {
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.user = user;
        db.collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let years = ["M1", "M2", "M3", "M4", "M5"];
              this.currentUserYear = doc.data().year;
              console.log(this.currentUserYear);
              if (years.includes(this.currentUserYear)) {
                this.yearGroups.push(this.currentUserYear);
              } else if (this.currentUserYear == "Teacher") {
                this.yearGroups = years;
              }
            });
          });
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    }
  },
  computed: {
    // availableYearGroups() {
    //   let years = ["M1", "M2", "M3", "M4", "M5"];
    //   if (years.includes(this.currentUserYear)) {
    //     this.yearGroups.push(this.currentUserYear);
    //     return this.yearGroups;
    //   } else if ((this.currentUserYear = "teacher")) {
    //     this.yearGroups = years;
    //     return this.yearGroups;
    //   }
    // }
  }
};
</script>

<style scoped>
.title-link {
  color: white;
  text-decoration: none;
}
</style>
