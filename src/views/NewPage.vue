<template>
  <div class="new-page">
    <Editor :new="true"></Editor>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import { db } from "@/main";
export default {
  components: {
    Editor
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>