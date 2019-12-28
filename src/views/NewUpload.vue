<template>
  <div class="new-upload">
    <h1>New Upload</h1>
    <p>Upload a file</p>
    <input type="file" @change="onFileSelected" />
    <v-btn @click="onUpload">Upload</v-btn>
  </div>
</template>

<script>
import { storage } from "@/main.js";
export default {
  name: "Upload",
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onUpload() {}
  },
  created() {
    console.log(storage.ref().parent.root);
  }
};
</script>

<style lang="scss" scoped></style>
