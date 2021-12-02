<template>
  <footer>
    <img src="../assets/logos/icon-left-font-monochrome-white-cropped.png" alt="logo">
  </footer>
</template> 

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

footer {
  width: 100%;
  background-color: $mainRed;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

  img {
    height: 50px;
    margin: 15px;
  }
}

</style>
