<template>
  <footer class="footer">
    <p>Contact: Groupomania ©</p>
    <a href="#">Groupomania@example.com</a>
  </footer>
</template> 

<style lang="scss" scoped>

@import "src/assets/styles/main.scss";

.footer {
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $mainRed;
  text-align: center;
  &, a {
    color: $white;
  }
}
</style>
