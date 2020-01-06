<template>
  <!-- html structure -->
  <div class="login">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <h1 class="display-2 text-center mb-5">Login</h1>
      <v-form @submit.prevent="login" ref="form" v-model="valid" :lazy-validation="lazy">
        <v-text-field label="Email" v-model="email" required :rules="emailRules"></v-text-field>
        <v-text-field
          type="password"
          label="Password"
          v-model="password"
          required
          :rules="passwordRules"
        ></v-text-field>

        <v-btn block :disabled="!valid" color="success" @click="validate">Login</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  // Data for login
  data() {
    return {
      valid: true,
      lazy: false,
      email: null,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@[sis.gl]+\..+/.test(v) || "E-mail must be valid" // checks if email has @sis.gl
      ],
      password: null,
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log(this.email, this.password);
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    }
  }
};
</script>
