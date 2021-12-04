<template>
  <div>
    <Nav />
      <div class="messageCard">
        <h3 class="messageCard__title">{{ message.title }}</h3>
        <p class="messageCard__subtitle">
          posted by {{ message.firstName }} {{ message.lastName }}
        </p>
        <div v-if="message.attachment !== '0'">
          <img :src="message.attachment" alt="message-image" />
        </div>
        <h3 class="messageCard__content">{{ message.content }}</h3>
        <Like />
        <div v-if="message.userId == this.$store.state.user.userId || this.$store.state.user.isAdmin == true">
          <button @click="deleteMessage" class="button">Delete message</button>
        </div>
      </div>
      <Comments />
      <CreateComment />   
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
      comments: []
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
        .then((res) => {
          if (res) {
            alert('The message was deleted !')
            this.$router.push('/feed')
          }
        })
        .catch((error) => {
          console.log(error)
          alert("You can't delete messages other than your own !")
        })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.messageCard {
    text-align: center;
    width: 540px;
    background: $blue;
    border-radius: 16px;
    padding: 10px;
    border: 4px solid #fff;
    margin: 80px auto 20px;

    &__title {
      color: #fff;
      font-size: 2rem;
      text-decoration: 6px underline $mainRed;
    }
    &__subtitle {
      color: white;
    }
    &__action {
      color: #fff;
    }
    &__action:hover {
      cursor: pointer;
    }
    &__content {
      color: $white;
      font-size: 1.4rem;
      border: 2px solid $lightRed;
      border-radius: 30px;
      padding: 5px;
      margin: 15px;
    }
    img {
      width: 50%;
    }
  }
</style>
