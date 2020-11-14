<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  beforeCreate() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
    // else {
    //   this.$router.push({ name: "home" });
    // }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
