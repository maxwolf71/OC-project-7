<template>
  <div>
    <Nav />
    <div class="main">
    <div class="card" v-for="message in messages" :key="message.id">
      <router-link :to="{ name: 'OneMessage', params: { id: message.id } }">
        <h1 class="card__title">{{ message.title }}</h1>
        <div class="" v-if="message.attachment !== '0'">
          <img :src="message.attachment" alt="message-image" />
        </div>
        <p class="card__content">{{ message.content }}</p>
        <p class="card__datePublish">
          Published by {{ message.firstName }} {{ message.lastName }}
          on {{ dateOfMessage(message.createdAt) }}
        </p>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios"
import Nav from "@/components/Nav"

export default {
  name: "Feed",
  components: { Nav },
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then(messages => {
        this.messages = messages.data
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  methods: {
    dateOfMessage(date) {
      const event   = new Date(date)
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}

      return event.toLocaleDateString('en-En', options)
    } 
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 50px;

  .card {
  text-align: center;
  width: 450px;
  background: $mainRed;
  border-radius: 16px;
  padding: 5px;

  &__title {
    color: $white;
    font-size: 30px;
  }
  &__content {
    color: $white;
    font-size: 20px;
    border: 2px solid $lightRed;
    border-radius: 30px;
    padding: 5px;
    margin: 15px;
  }
  &__datePublish {
    color: $white;
    font-size: 15px;
    font-style: italic;
  }
  img {
    width: 40%; 
  }
}
}
</style>
