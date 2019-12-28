<template>
  <div class="categories">
    <h1>Categories</h1>
    <ul>
      <li v-for="cat in categories" :key="cat.id">{{cat.title}}</li>
    </ul>
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

<style lang="scss" scoped>
</style>