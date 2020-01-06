<template>
  <div class="new-category">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <v-form>
        <v-text-field v-model="title" label="Category/Unit Title" outlined></v-text-field> <!-- text field models data property -->
        <div elevation="5" class="d-flex justify-space-around">
          <v-checkbox
            v-for="(year, index) in yearGroups"
            :key="index"
            v-model="selected"
            :label="year"
            :value="year"
            color="light-blue lighten-1"
          ></v-checkbox> <!-- Check boxes also model data property  -->
        </div>
        <v-btn
          v-on:click="submit()"
          color="light-blue accent-4"
          large
          class="mt-6"
          elevation="4"
          dark
          block
        >Create unit/category</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return { // these values update automatically when values are entered
      title: null,
      yearGroups: [],
      selected: []
    };
  },
  methods: {
    submit() {
      if (this.newTitle != "" && this.selected.length != 0) {
        db.collection("categories").add({
          title: this.title,
          yearGroups: this.selected
        }); // adding data to database
        this.$router.push({ name: "home" });
      } else {
        alert("Please fill in all values");
      }
    }
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
  }
};
</script>

<style lang="scss" scoped></style>
