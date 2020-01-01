<template>
  <div class="new-category">
    <v-container class="mt-12">
      <v-form>
        <v-text-field
          v-model="title"
          label="Unit/Category Title"
          outlined
        ></v-text-field>
        <div elevation="5" class="d-flex justify-space-around">
          <v-checkbox
            v-for="(year, index) in yearGroups"
            :key="index"
            v-model="selected"
            :label="year"
            :value="year"
            color="light-blue lighten-1"
          ></v-checkbox>
        </div>
        <v-btn
          v-on:click="submit()"
          color="light-blue accent-4"
          large
          class="mt-6"
          elevation="4"
          dark
          block
          >Create unit/category</v-btn
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      title: null,
      yearGroups: [],
      selected: []
    };
  },
  methods: {
    submit() {
      db.collection("categories").add({
        title: this.title,
        yearGroups: this.selected
      });
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
