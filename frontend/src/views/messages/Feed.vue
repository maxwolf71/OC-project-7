<template>
  <div>
    <div class="card" v-for="message in messages" :key="message.id">
      <router-link :to="{ name: 'OneMessage', params: { id: message.id } }">
        <h1 class="card__title">{{ message.title }}</h1>
        <div class="" v-if="message.attachment !== '0'">
          <img :src="message.attachment" alt="message-image" />
        </div>
        <p class="card__subtitle">{{ message.content }}</p>
        <p class="card__title">
          Published by {{ message.firstName }} {{ message.lastName }}
          on {{ dateOfMessage(message.createdAt) }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>


import axios from "axios"

export default {
  name: "Feed",
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
.card {
  text-align: center;
  max-width: 100%;
  width: 540px;
  background: $mainRed;
  border-radius: 16px;
  padding: 10px;
  margin: 70px auto;

  &__title {
    font-weight: 800;
    color: $white;
  }
  &__subtitle {
    color: $white;
    font-size: 30px;
  }
  &__action:hover {
    cursor: pointer;
  }
  img {
    width: 50%; 
  }
}
</style>
