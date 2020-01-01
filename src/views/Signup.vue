<template>
  <div class="signup">
    <v-container class="mt-12">
      <h1 class="display-2 text-center mb-5">Signup page</h1>
      <v-form
        @submit.prevent="signup"
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >
        <v-text-field
          label="Name"
          v-model="name"
          required
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="email"
          required
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          v-model="password"
          required
          :rules="passwordRules"
        ></v-text-field>
        <v-select
          v-model="selectedYear"
          :items="yearGroups"
          :rules="[v => !!v || 'Item is required']"
          label="Year Group"
          required
        ></v-select>
        <v-btn block :disabled="!valid" color="success" @click="validate"
          >Signup</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import slugify from "slugify";
import { db } from "@/main.js";
import firebase from "firebase";

export default {
  data() {
    return {
      valid: true,
      lazy: false,
      selectedYear: null,
      name: null,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 10 characters"
      ],
      email: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@[sis.gl]+\..+/.test(v) || "E-mail must be valid"
      ],
      password: null,
      passwordRules: [v => !!v || "Password is required"],
      yearGroups: [],
      slug: null
    };
  },
  created() {
    db.collection("studentdata")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let year = doc.data().year;
          this.yearGroups.push(year);
          this.yearGroups.sort();
        });
      });
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        console.log(this.slug);
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
