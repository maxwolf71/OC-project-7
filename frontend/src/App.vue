<template>
  <nav>
    <Nav />
    <Footer />
    <router-view />
  </nav>
</template>

<script>
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export default {
  name: "App",
  components: { Nav, Footer }
}
</script>

<style lang="scss" >

@import "assets/styles/main";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-image: url(assets/logos/icon.png);
  background-repeat: no-repeat;
  background-position: center 5%;
  padding: 32px;
  a {
    text-decoration: none;
  }
}

.button {
  background: $white;
  color: $mainRed;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
  margin: 15px 0;

  &.button:hover {
    cursor: pointer;
    background: $lightRed;
  }
  &.button--disabled {
    background: $white;
    color: $mainRed;
  }
  &.button--disabled:hover {
    cursor: not-allowed;
    background: $lightRed;
  }
}

</style>
