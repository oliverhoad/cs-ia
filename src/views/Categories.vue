<template>
  <div class="categories">
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <h1 class="display-3 my-5">Categories/Units</h1>
      <v-card>
        <v-list>
          <v-list-item
            v-for="cat in categories"
            :key="cat.id"
            :to="{ name: 'edit-category', params: { title: cat.title } }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="cat.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      categories: []
    };
  },
  created() {
    //   importing collection from firestore
    db.collection("categories")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let category = doc.data();
          category.id = doc.id;
          this.categories.push(category);
        });
      });
  }
};
</script>

<style lang="scss" scoped></style>
