<template>
  <div>
    <nav class="navBar">
      <router-link :to="{ name: 'Profile' }"><fa icon="user" /></router-link>
      <router-link :to="{ name: 'Feed' }"><fa icon="rss" /></router-link>
      <router-link :to="{ name: 'CreateMessage' }"><fa icon="comment-alt" /></router-link>
    </nav>
  </div>
  
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: $mainRed;
  margin-bottom: 100px;
  img {
    height: 60px;
  }
  &__links, a {
    color: $white;
    font-size: 40px;
  }
  a.router-link-active {
    font-weight: bold;
    color: $blue;
  }
}
</style>
