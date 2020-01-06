<template>
  <div class="edit categories">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <v-form>
        <v-text-field v-model="newTitle" label="Category/Unit Title" outlined></v-text-field>
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
        >Edit unit/category</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      title: this.$route.params.title,
      newTitle: null,
      yearGroups: [],
      selected: [],
      catId: null
    };
  },
  methods: {
    submit() {
      //   var batch = db.batch();
      if (this.newTitle != "" && this.selected.length != 0) {
        db.collection("pages")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.data());
              var pageId = doc.id;
              if (doc.data().category == this.title) { // looping over each page and checking if there connected category is the same as the category being edited
                db.collection("pages")
                  .doc(pageId)
                  .update({ category: this.newTitle }); // if it is it is updated on each page with the updated category.
              }
            });
          });
        //   var pagesRef = db
        //     .collection("pages")
        //     .doc()
        //     .where("category", "==", this.title);
        //   db.batch().update(pagesRef, { category: this.title });

        db.collection("categories")
          .doc(this.catId)
          .set({
            title: this.newTitle,
            yearGroups: this.selected
          });
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
    db.collection("categories")
      .where("title", "==", this.title)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
          this.newTitle = this.title;
          this.selected = doc.data().yearGroups;
          this.catId = doc.id;
        });
      });
  }
};
</script>

<style lang="scss" scoped></style>
