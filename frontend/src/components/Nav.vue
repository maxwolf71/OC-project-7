<template>
  <div>
    <nav class="navBar">
      <router-link :to="{ name: 'Profile' }"><fa icon="user-alt" /></router-link>
      <router-link :to="{ name: 'Feed' }"><fa icon="rss" /></router-link>
      <router-link :to="{ name: 'CreateMessage' }"><fa icon="comment-alt" /></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: { title: String },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.navBar {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: $mainRed;
  
  img {
    height: 60px;
  }
  &__links, a {
    color: $white;
    font-size: 2.8rem;
  }
  a.router-link-active {
    color: $blue;
  }
}
</style>
