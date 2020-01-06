
<template>
  <!-- html structure for signup form with functions attachec to signup button -->
  <div class="signup">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <h1 class="display-2 text-center mb-5">Signup page</h1>
      <v-form @submit.prevent="signup" ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field label="Name" v-model="name" required :rules="nameRules"></v-text-field>
        <v-text-field label="Email" v-model="email" required :rules="emailRules"></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          v-model="password"
          required
          :rules="passwordRules"
        ></v-text-field>
        <!-- Getting all year groups from database and adding them as options for selection -->
        <v-select
          v-model="selectedYear"
          :items="yearGroups"
          :rules="[v => !!v || 'Item is required']"
          label="Year Group"
          required
        ></v-select>
        <!-- Button enables when all form fields are filled in correctly -->
        <v-btn block :disabled="!valid" color="success" @click="validate">Signup</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
// Importing database and dependencies
import slugify from "slugify";
import { db } from "@/main.js";
import firebase from "firebase";

export default {
  data() {
    return {
      // Variables
      valid: true,
      lazy: false,
      selectedYear: null,
      name: null,
      // Valid form rules to check if form is valid
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 10 characters"
      ],
      email: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@[sis.gl]+\..+/.test(v) || "E-mail must be valid" // checks if email has @sis.gl
      ],
      password: null,
      passwordRules: [v => !!v || "Password is required"],
      yearGroups: [],
      slug: null
    };
  },
  // Functions and database get requests when initialise
  created() {
    db.collection("studentdata")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // year variable in the loop e.g start at M1 then M2 etc...
          let year = doc.data().year;
          // Pushes current year in year variable to dyanmic array variable of the program which is outputted to the UI
          this.yearGroups.push(year);
          // Sorts array just in case it is out of order
          this.yearGroups.sort();
        });
      });
  },
  methods: {
    // Validation method that runs when submit button as extra layer to do final tasks before authenticating and creating user
    validate() {
      if (this.$refs.form.validate()) {
        // creates readable form of Full name
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // console.log(this.slug);
        // Checks if user already exists if not, creates new user. If does exist then doesn't
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            console.log("Taken");
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  name: this.name,
                  year: this.selectedYear,
                  id: cred.user.uid
                });
              })
              .then(() => {
                // redirects to home page when successful
                this.$router.push({ name: "home" });
              })
              .catch(error => {
                console.log(error);
                console.log(err.message);
              });
            console.log("Available");
          }
        });
      }
    }
  }
};
</script>
