<template>
  <nav class="navBar">
    <h1 class="navBar__links">{{ title }}</h1>
    <router-link :to="{ name: 'Profile' }">Profile</router-link> |
    <router-link :to="{ name: 'Feed' }">Message feed</router-link> |
    <router-link :to="{ name: 'CreateMessage' }">Post a message</router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: { title: String },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.navBar {
  padding: 10px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: $mainRed;
  color: $white;
  text-align: center;
  &__links, a {
    color: $white;
  }
  a.router-link-active {
    font-weight: bold;
    color: $extraColor;
  }
}
</style>
