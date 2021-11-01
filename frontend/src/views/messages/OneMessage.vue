<template>
  <div>
    <Banner title="Message view" />
    <div class="card">
      <h1>{{ messages.title }}</h1>
      <h3>{{ messages.content }}</h3>
      <img :src="messages.attachement" alt="" /><br/>
      <button @click="modifyMessage" class="button">Modify</button> |
      <button @click="deleteMessage" class="button">Delete</button><br>
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
    //  Get single message *********************************************************** 
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
        .then((res) => {
          if (res) {
            this.$router.push("/feed") //go to message feed
            alert("You're message has been deleted")
          }
        })
        .catch((error) => {
         console.log(error.message)
         alert("You can't delete messages other than your own !")
        })
    },
    //  Modify message *********************************************************** 
    modifyMessage() {
      const messageId = this.$route.params.id
      const token = this.$store.state.user.token

      axios
        .put(`http://localhost:3000/api/messages/${messageId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            alert("You're bio has been updated")
          }
        })
        .catch((error) => {
         console.log(error.message)
        })
    }
  },
}
</script>
