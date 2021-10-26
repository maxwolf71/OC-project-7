<template>
  <div>
    <Banner title="My message" />
    <div class="card">
      <h1>{{ }}</h1>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import axios from "axios"

export default {
  data() {
    return {
      
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) { // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },
  components: { Banner },
  created() {
    axios
      .get("http://localhost:3000/api/messages/:id")
      .then((response) => {
        this.messages = response.data
        console.log(this.messages)
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
}
</script>
