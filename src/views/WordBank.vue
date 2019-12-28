<template>
  <v-data-table
    calculate-widths="true"
    :search="search"
    :headers="headers"
    :items="wordbank"
    :sort-by="['word']"
    :sort-desc="[false]"
    class="mytable elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Wordbank</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{on}">
            <v-btn color="primary" dark v-on="on">New Word</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field v-model="editedWord.word" label="Word"></v-text-field>
                  <v-text-field v-model="editedWord.definition" label="Definition"></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{item}">
      <v-icon block @click="editWord(item)">mdi-pencil</v-icon>
      <v-icon block @click="deleteWord(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { db } from "@/main.js";
export default {
  data() {
    return {
      docID: "",
      dialog: false,
      search: "",
      wordbank: [],
      headers: [
        {
          text: "Word",
          sortable: true,
          value: "word"
        },
        {
          text: "Definition",
          sortable: true,
          value: "definition"
        },
        { text: "Actions", value: "action", sortable: false }
      ],
      editedIndex: -1,
      editedWord: {
        word: "",
        definition: ""
      },
      defaultWord: {
        word: "",
        definition: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    // db.collection("wordbank")
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       console.log(doc.data().wordbank);
    //       this.wordbank = doc.data().wordbank;
    //       this.docID = doc.id;
    //     });
    //   });
  },
  methods: {
    initialize() {
      db.collection("wordbank")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.data().wordbank);
            this.wordbank = doc.data().wordbank;
            this.docID = doc.id;
          });
        });
    },
    editWord(item) {
      this.editedIndex = this.wordbank.indexOf(item);
      this.editedWord = Object.assign({}, item);
      this.dialog = true;

      // this.editedIndex = this.wordbank.indexOf(item);
      // console.log(this.editedIndex);
      // console.log(this.wordbank[this.editedIndex]);
      // this.editedWord = Object.assign({}, item);
      // this.wordbank[this.editedIndex] = Object.assign({}, item);
      // console.log(this.wordbank);
      // db.collection("wordbank")
      //   .doc(this.docID)
      //   .update({
      //     wordbank: this.wordbank
      //   });
      // this.dialog = true;
    },
    deleteWord(item) {
      const index = this.wordbank.indexOf(item);
      confirm("Are you sure you want to delete this word?") &&
        this.wordbank.splice(index, 1) &&
        db
          .collection("wordbank")
          .doc(this.docID)
          .set({
            wordbank: this.wordbank
          });

      // const index = this.wordbank.indexOf(item);
      // console.log(index);
      // confirm("Are you sure you want to delete this item?") &&
      //   this.wordbank.splice(index, 1) &&
      //   db
      //     .collection("wordbank")
      //     .doc(this.docID)
      //     .set({
      //       wordbank: this.wordbank
      //     });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedWord = Object.assign({}, this.defaultWord);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.wordbank[this.editedIndex], this.editedWord);
        db.collection("wordbank")
          .doc(this.docID)
          .set({
            wordbank: this.wordbank
          });
      } else {
        this.wordbank.push(this.editedWord);
        db.collection("wordbank")
          .doc(this.docID)
          .set({
            wordbank: this.wordbank
          });
      }
      this.close();

      // this.wordbank.push(this.editedWord);
      // db.collection("wordbank")
      //   .doc(this.docID)
      //   .set({
      //     wordbank: this.wordbank
      //   });
      // this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mytable tbody tr:not(:last-child) {
  border: none;
}
</style>