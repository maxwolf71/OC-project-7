<template>
  <div>
    <Banner title="Message feed" />

    <div class="card" v-for="message in messages" :key="message.id">
      <router-link :to="{ name: 'OneMessage', params: { id: message.id }}">
        <h1 class="card__title" >{{ message.User.firstName }} {{ message.User.lastName }}</h1>
        <h3 class="card__subtitle">{{ message.title}}</h3>
        <p class="card__title">{{ message.content }}</p>
        <img :src="message.attachement" :alt="message.title"/> <br>
        <h1>{{ message.id }}</h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import axios from "axios"

export default {
  name: 'Feed',
  components: { Banner },
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
  methods: {
    modifyMessage() {
      console.log('ok');
    }
  }
}
</script>

<style></style>
