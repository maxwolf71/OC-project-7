<template>
  <footer class="footer">
    <img src="../assets/logos/icon-above-font.png" alt="logo">
    <p class="contact">Contact : <a href="#">Groupomania@example.com</a></p>
    
  </footer>
</template> 

<style lang="scss" scoped>

@import "src/assets/styles/main.scss";

.footer {
  padding: 15px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $mainRed;
  text-align: center;

  & .contact, a {
    color: $white;
    display: flex;
    flex-direction: column;
  }
  img {
    height: 70px;
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0 0 5px 10px;
  }
}
</style>
