<template>
  <div class="new-category">
    <v-container>
      <v-form>
        <v-text-field v-model="title" label="Category Title" outlined></v-text-field>
        <p>{{ selected }}</p>
        <v-checkbox
          v-for="(year, index) in yearGroups"
          :key="index"
          v-model="selected"
          :label="year"
          :value="year"
        ></v-checkbox>
        <v-btn v-on:click="submit()" block>Submit</v-btn>
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

<style lang="scss" scoped>
</style>