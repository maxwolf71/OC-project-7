<template>
  <nav>
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/feed">Message feed</router-link> |
    <router-link to="/message">Post a message</router-link>
    <router-view />
  </nav>
</template>

<script>
export default {
  name: "App",
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
  background-color: #532380;
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
  background: #ce9f9f;
  border-radius: 16px;
  padding: 10px;
  border: 2px solid red;
  margin: 10px 0;
}
.card__title {
  text-align: center;
  font-weight: 800;
  color: #532380;
}
.card__subtitle {
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 30px;
}
.bio {
  font-weight: bold;
  padding: 50px 0;
  border: 2px solid whitesmoke;
  margin: 20px 0 150px;
  color: white;
  border-radius: 16px;
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
h1 {
  color: white;
  font-size: 35px;
  padding: 20px;
}
h3 {
  color: white;
}
nav, a {
  text-align: center;
  text-decoration: none;
  color: #999;
}
.router-link-active {
  font-weight: bold;
  color: whitesmoke;
}
</style>
