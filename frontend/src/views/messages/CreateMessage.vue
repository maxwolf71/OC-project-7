<template>
  <div class="createPost">
    <Nav title="Post a message" />
    <h2>Enter you text here :</h2>
    <div class="newPost">
      <form class="formCreate" @submit.prevent="createMessage">
        <div class="formNewPost">
          <label for="title"></label>
          <input
            name="title"
            class="contentNewPost"
            placeholder="Message title here"
            v-model="title"
          /><br />
        </div>

        <div class="formNewPost">
          <label for="content"></label>
          <textarea
            name="content"
            class="contentNewPost"
            placeholder="Text content here"
            v-model="content"
          ></textarea>
          <br />
        </div>

        <div class="formNewPost">
          <label for="attachment">
            <input class="attachment" type="file" name="attachment" /> <br />
          </label>
        </div>

        <button type="submit">Publier</button>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import axios from "axios"

export default {
  name: "Message",
  data() {
    return {
      title: "",
      content: "",
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },
  components: { Nav },
  methods: {
    createMessage() {
      const formCreate = document.getElementsByClassName("formCreate")[0]
      const token = this.$store.state.user.token
      let data = new FormData(formCreate)

      axios
        .post("http://localhost:3000/api/messages/new", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("/feed")
          } //go to message feed
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
  },
}
</script>
