<template>
  <v-app
    style="background: url('./assets/background.jpg'); background-repeat: no-repeat; background-size: cover;"
  >
    <Nav></Nav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import { Editor } from "@/components/Editor";
import Nav from "./components/Nav";
import image from "./assets/background.jpg";

export default {
  name: "App",
  components: {
    Nav
  },
  data: () => ({
    //
  }),
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "Your Website";
    }
  }
};
</script>

<style lang="scss">
body {
  background: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
