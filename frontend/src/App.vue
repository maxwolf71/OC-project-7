<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
}
</script>

<style>
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
  background-image: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
img {
  max-width: 30%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background: #ffd7d7;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
  color: #bb4c55;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.bio {
  font-weight: bold;
}
.button {
  background: #bb4c55;
  color: #fff;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
.messages {
  border: 2px solid black;
  padding: 5px;
  margin-bottom: 5px;
}
</style>
