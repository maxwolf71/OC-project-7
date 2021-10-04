<template>
  <div>
    <div v-for="message in messages" :key="message">
      <h1>{{ message.title }}</h1>
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      //if user id -1
      this.$router.push("/"); //go back to login
      return;
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((response) => {
        this.messages = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
