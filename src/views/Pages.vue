<template>
  <div>
    <v-card class="mx-auto my-12 pa-7" elevation="15" width="80%">
      <h1 class="display-3 mb-5">Pages for {{ yearGroup }}</h1> <!-- changes based on what teacher or student selects. E.g M1, M2 etc... -->
      <v-row justify="center">
        <v-expansion-panels popout>
          <!-- Loop over all category titles created by teacher but only output if it for the selected year group. -->
          <v-expansion-panel 
            v-for="(catTitle, index) in catTitles"
            :key="index"
            v-if="catTitle.yearGroups.includes(yearGroup)"
          >
            <v-expansion-panel-header>
              {{
              catTitle.title
              }} <!-- Output category title -->
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list-item
                two-line
                v-for="(catContent, index) in catContents"
                :key="index"
                v-if="catContent.category.includes(catTitle.title)"
              > <!-- a custom array that outputs teacher resources if it has the category title in the JSON data -->
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                    catContent.content[0].content[0].text
                    }} <!-- Dot notation leading to title of teacher resource -->
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{
                    catContent.content[1].content[0].text
                    }} <!-- Dot notation leading to subtitle of teacher resource -->
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action
                  :to="{ name: 'edit-page', params: {pageSlug: catContent.slug } }" 
                > <!-- this redirects to the edit page with parameters that allow the editor to know what exact content it needs to grab -->
                  <v-btn
                    v-if="currentUserYear != 'Teacher'"
                    icon
                    fab
                    elevation="5"
                    :to="{ name: 'edit-page', params: {pageSlug: catContent.slug } }"
                  >
                    <v-icon color="grey lighten-1">mdi-page-next</v-icon>
                  </v-btn>
                </v-list-item-action>

                <v-list-item-action
                  :to="{ name: 'edit-page', params: {pageSlug: catContent.slug } }"
                >
                  <v-btn
                    v-if="currentUserYear == 'Teacher'"
                    icon
                    fab
                    elevation="5"
                    :to="{ name: 'edit-page', params: {pageSlug: catContent.slug } }"
                  >
                    <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action v-on:click="deletePage(catContent.id)">
                  <v-btn icon fab elevation="5" v-if="currentUserYear == 'Teacher'">
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { db } from "@/main.js";
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      currentUserYear: null,
      yearGroup: this.$route.params.yearGroup,
      // arrays important to outputting data for correct categories
      catTitles: [],
      catContents: []
    };
  },
  methods: {
    // changes parameter in query bar
    updateYear() {
      this.yearGroup = this.$route.params.yearGroup;
    },
    // deletes selected resource from database and updates
    deletePage(id) {
      db.collection("pages")
        .doc(id)
        .delete()
        .then(() => {
          this.catContents = this.catContents.filter(catContent => {
            return catContent.id != id;
          });
        });
    }
  },
  watch: {
    // runs method when a change occurs
    $route: "updateYear"
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
              console.log(this.currentUserYear);
            });
          });
      } else {
        this.user = null;
      }
    });

    // gets inital categories
    db.collection("categories")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.catTitles.push(doc.data());
        });
      });
    // gets initial unfiltered content
    db.collection("pages")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let catContent = doc.data();
          catContent.id = doc.id;
          this.catContents.push(catContent);
        });
      });
  }
};
</script>

<style lang="scss" scoped></style>
