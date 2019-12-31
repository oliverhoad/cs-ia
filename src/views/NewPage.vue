<template>
  <div class="new-page">
    <Editor :editable="editable" :new="true"></Editor>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import { db } from "@/main";
import firebase from "firebase";
export default {
  components: {
    Editor
  },
  data() {
    return {
      user: null,
      currentUserYear: null,
      editable: null
    };
  },
  methods: {},
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
              if (this.currentUserYear == "Teacher") {
                this.editable = true;
              } else if (this.currentUserYear != "Teacher") {
                this.editable = false;
              }
            });
          });
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
