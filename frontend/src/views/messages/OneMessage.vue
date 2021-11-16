<template>
  <div>
    <Nav title="Message view" />
    <div class="card">
      <h3 class="card__title">{{ message.title }}</h3>
      <h3 class="card__title">by {{ message.firstName }} {{ message.lastName }}</h3>
      <div v-if="message.attachment !== '0'">
        <img :src="message.attachment" alt="message-image" />
      </div>
      <h3 class="card__subtitle">{{ message.content }}</h3>
      <div v-if="message.userId == this.$store.state.user.userId || this.$store.state.user.isAdmin == true">
        <button @click="deleteMessage" class="button">Delete</button>
      </div>
      <div class="" v-else>
        <Like />
        <CreateComment />
        <Comments />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import Like from "@/components/Like"
import CreateComment from "@/components/CreateComment"
import Comments from "@/components/Comments"
import axios from "axios"

export default {
  name: "OneMessage",
  components: { Nav, Like, CreateComment, Comments },
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

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.card {
  text-align: center;
  max-width: 100%;
  width: 540px;
  background: $mainRed;
  border-radius: 16px;
  padding: 10px;
  border: 4px solid #fff;
  margin: 50px auto;

  &__title {
    font-weight: 800;
    color: #fff;
  }
  &__subtitle {
    color: white;
    font-weight: 500;
    font-size: 30px;
  }
  &__action {
    color: #fff;
  }
  &__action:hover {
    cursor: pointer;
  }
  img {
    width: 50%; 
  }
}
</style>
