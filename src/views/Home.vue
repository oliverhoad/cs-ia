<template>
  <!-- Html for Home page -->
  <div class="home">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <h1 class="display-3 text-center">Welcome Back</h1>
      <p class="mt-10 display-1 font-regular text-center">The Word of the Day is...</p>
      <!-- outputs updating word of the day from Wordnik API -->
      <p class="display-2 text-capitalize text-center light-blue--text pa-3">{{ wordOfTheDay }}</p>

      <!-- loops over JSON from Wordnik API and uses 'word' and 'definition' values -->
      <v-card
        width="80%"
        class="mx-auto my-3 light-blue lighten-5"
        v-for="(definition, index) in wordOfTheDayDef"
        :key="index"
      >
        <v-card-text>
          <p class="font-weight-bold">{{ definition.partOfSpeech }}</p>
          <div class="text--primary body-1">
            <span v-html="definition.text"></span>
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
// import axios for get requests to outside API
import axios from "axios";
import firebase from "firebase";
export default {
  data() {
    // properties which will contain API data when created
    return {
      wordOfTheDay: "",
      wordOfTheDayDef: []
    };
  },
  created() {
    // when initialise axios gets data from API and assigns to properties in Object
    axios
      .get(
        "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=2e4hi9qgc3om8fyjsg9qkj0k9ve4mwa02y7njy4gwf3adjc2f" // API link
      )
      .then(response => {
        console.log(response);
        this.wordOfTheDay = response.data.word;
        this.wordOfTheDayDef = response.data.definitions;
      });
  }
};
</script>

<style lang="scss" scoped></style>
