<template>
  <nav>
    <router-view />
    <Footer />
  </nav>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Footer },
}
</script>

<style lang="scss">
@import "./assets/styles/_variables.scss";

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;

  body {
    background-image: url(assets/logos/icon.png);
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    @media (min-width: 1024px) {
      background-size: contain;
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
  }
}
</style>
