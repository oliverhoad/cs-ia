<template>
  <div class="edit-page">
    <Editor :editable="editable" :new="false" :slug="pageSlug"></Editor> <!-- Accepts parameters that change how it functions. -->
  </div>
</template>

<script>
import { db } from "@/main.js";
import Editor from "../components/Editor"; // Importing the editor component
import firebase from "firebase";
export default {
  name: "edit-page",
  components: {
    Editor
  },
  data() {
    return {
      user: null,
      currentUserYear: null,
      editable: null,
      pageSlug: this.$route.params.pageSlug // getting from previous

      // pageData: {}
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.user = user;
        db.collection("users")
          .where("id", "==", this.user.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.currentUserYear = doc.data().year;
              // console.log(this.currentUserYear);
              if (this.currentUserYear == "Teacher") { // allows teacher to edit
                this.editable = true;
              } else if (this.currentUserYear != "Teacher") { // doesn't allow students
                this.editable = false;
              }
            });
          });
      } else {
        this.user = null;
      }
    });

    // db.collection("pages")
    //   .where("slug", "==", this.pageSlug)
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       // console.log(doc.data());
    //       const temp = doc.data();
    //       console.log(temp);
    //       this.pageData = doc.data();
    //       console.log(this.pageData);
    //     });
    //   });
    // console.log(this.pageData);
  }
};
</script>

<style lang="scss" scoped></style>
