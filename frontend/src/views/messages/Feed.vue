<template>
  <div class="main">
    <Nav />
    <div class="messageCard" v-for="message in messages" :key="message.id">
      <h1 class="messageCard__title">{{ message.title }}</h1>
      <div class="" v-if="message.attachment !== '0'">
        <img :src="message.attachment" alt="message-image" />
      </div>
      <p class="messageCard__content">{{ message.content }}</p>
      <p class="messageCard__datePublish">
        Published by {{ message.firstName }} {{ message.lastName }} on
        {{ dateOfMessage(message.createdAt) }}
      </p>
      <router-link :to="{ name: 'OneMessage', params: { id: message.id } }">'  
        <button class="button">See message</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Nav from "@/components/Nav";

export default {
  name: "Feed",
  components: { Nav },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      // if userId doesn't exist
      this.$router.push("/"); //go back to login
      return;
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((messages) => {
        this.messages = messages.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  methods: {
    dateOfMessage(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      return event.toLocaleDateString("en-En", options);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.main {
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  .messageCard {
    width: 500px;
    text-align: center;
    background: $blue;
    border-radius: 16px;

    a { // router-link
      text-decoration: none;
    }
    &__title {
      color: $white;
      font-size: 30px;
      text-decoration: 6px underline $mainRed;
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
      color: $mainRed;
      font-size: 15px;
      font-style: italic;
    }
    img {
      width: 200px;
      border-radius: 20px;
    }
    .button {
      width: 30%;
      padding: 5px;
    }
  }
}
</style>
