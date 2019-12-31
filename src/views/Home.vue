<template>
  <div class="home">
    <div class="d-flex flex-column justify-center align-center mt-10">
      <h1 class="display-4 light-blue--text">Welcome Back</h1>
      <p class="mt-10 display-1 font-regular">The Word of the Day is...</p>
      <p
        class="display-2 text-capitalize light-blue darken-1 light-blue--text text--lighten-4 pa-3"
      >
        {{ wordOfTheDay }}
      </p>

      <v-card
        width="80%"
        class="mx-auto my-3"
        v-for="(definition, index) in wordOfTheDayDef"
        :key="index"
      >
        <v-card-text>
          <p>{{ definition.partOfSpeech }}</p>
          <div class="text--primary">{{ definition.text }}</div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
  data() {
    return {
      wordOfTheDay: "",
      wordOfTheDayDef: []
    };
  },
  created() {
    axios
      .get(
        "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=2e4hi9qgc3om8fyjsg9qkj0k9ve4mwa02y7njy4gwf3adjc2f"
      )
      .then(response => {
        console.log(response);
        this.wordOfTheDay = response.data.word;
        this.wordOfTheDayDef = response.data.definitions;
      });
  },
  mounted() {
    console.log(firebase.auth().currentUser);
  }
};
</script>

<style lang="scss" scoped></style>
