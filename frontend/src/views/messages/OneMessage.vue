<template>
  <div>
    <Nav title="Message view" />
    <div class="card">
      <h3>{{ message.title }}</h3>
      <h3>by {{ message.firstName }} {{ message.lastName }}</h3>
      <img :src="message.attachment" alt="message-image" />
      <h3>{{ message.content }}</h3>
      <div v-if="message.userId == this.$store.state.user.userId || this.$store.state.user.isAdmin == true">
        <button @click="deleteMessage" class="button">Delete</button>
      </div>
      <div class="" v-else>
        <Like />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import Like from "@/components/Like"
import axios from "axios"

export default {
  name: "OneMessage",
  components: { Nav, Like },
  data() {
    return {
      message: [],
    }
  },
  mounted() {
    this.getOneMessage()
  },
  methods: {
    //  Get single message ***********************************************************
    getOneMessage() {
      const messageId = this.$route.params.id

      axios
        .get(`http://localhost:3000/api/messages/${messageId}`)
        .then(response => {
          this.message = response.data
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    //  Delete message ***********************************************************
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
        .then(res => {
          if (res) {
            this.$router.push("/feed") //go to message feed
            alert("You're message has been deleted")
          }
        })
        .catch(error => {
          console.log(error)
          alert("You can't delete messages other than your own !")
        })
    },
  },
}
</script>
