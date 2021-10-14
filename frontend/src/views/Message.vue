<template>
  <div class="">
    <router-link to="/profile">Go to my profile</router-link> |
    <router-link to="/feed">See message feed</router-link>
    <Banner title="Post a message" />
    <div class="message">
      <p>Message content here</p>
    </div>

    <div class="inputfield">
      <button @click="postMessage()" type="submit">Post message</button>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import axios from "axios"
import {mapState} from "vuex";

export default {
  name: "Message",
  components: { Banner },
  data() {
    return {
      title: "",
      comment: "",
      message: [],
    }
  },
  computed: {
    validatedFields: function() {
      return this.title !== ""
      //return this.comment !== ""
    },
    ...mapState(["status"])
  },
  methods: {
    postMessage() {
      axios
        .post("http://localhost:3000/api/messages/new")
        .then((res) => {
          this.feed = res.data
          self.$router.push("/profile")
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
