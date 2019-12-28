<template>
  <v-app>
    <Nav></Nav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import { Editor } from "@/components/Editor";
import Nav from "./components/Nav";

export default {
  name: "App",
  components: {
    Nav
  },
  data: () => ({
    //
  })
};
</script>
