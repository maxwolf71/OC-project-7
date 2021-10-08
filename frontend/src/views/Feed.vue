<template>
  <div>
    <div v-for="message in messages" :key="message">
      <h1>{{ message.User.firstName }} {{ message.User.lastName }}</h1>
      <h2>{{ message. title}}</h2>
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) { // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((response) => {
        this.messages = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style></style>
