<template>
  <div>
    <Banner title="My message" />
    <div class="card">
      <h1>{{ messages.title }}</h1>
      <h3>{{ messages.content }}</h3>
      <img :src="messages.attachement" :alt="messages.title" /><br />
      <button>Modify</button> |
      <button @click="deleteMessage">Delete</button>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import axios from "axios"

export default {
  name: "OneMessage",
  components: { Banner },
  data() {
    return {
      messages: [],
      id: this.$route.params.id,
    }
  },
  mounted() {
    this.getOneMessage()
  },
  methods: {
    getOneMessage() {
      const messageId = this.$route.params.id

      axios
        .get(`http://localhost:3000/api/messages/${messageId}`)
        .then((response) => {
          this.messages = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteMessage() {
      const messageId = this.$route.params.id
      const token = this.$store.state.user.token

      axios
        .delete(`http://localhost:3000/api/messages/${messageId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("/feed") //go to message feed
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
  },
}
</script>
