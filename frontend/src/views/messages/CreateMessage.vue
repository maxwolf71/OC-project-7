<template>
  <div>
    <Nav />
    <div class="card">
      <h2 class="card__title">Create your message :</h2>
      <div class="card">
        <form class="formCreate" @submit.prevent="createMessage">
          <div class="card__title">
            <label for="title">Title: </label><br />
            <input
              name="title"
              class="contentNewPost"
              placeholder="Message title here"
              v-model="title"
            /><br />
          </div>

          <div class="card__message">
            <label for="content">Message: </label><br />
            <textarea
              name="content"
              class="contentNewPost"
              placeholder="Text content here"
              v-model="content"
            ></textarea>
            <br />
          </div>
          <div class="card">
            <label class="card__image" for="attachment"
              >Select Image : 
              <input class="attachment" type="file" name="attachment" /> <br />
            </label>
          </div>
          <button class="button" type="submit">Post message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Nav from "@/components/Nav"

export default {
  name: "Message",
  components: { Nav },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      // if userId doesn't exist
      this.$router.push("/"); //go back to login
      return;
    }
  },
  methods: {
    createMessage() {
      const formCreate = document.getElementsByClassName("formCreate")[0];
      let data = new FormData(formCreate);
      const token = this.$store.state.user.token;

      axios
        .post("http://localhost:3000/api/messages/new", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            this.$router.push("/feed");
          } //go to message feed
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
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
  border: 4px solid $white;
  margin: 50px auto;

  &__title {
    color: $white;
    font-size: 25px;
  }
  &__message {
    color: $white;
    font-size: 20px;
  }
  &__image {
    color: $white;
  }
  &__action {
    color: $white;
  }
  &__action:hover {
    cursor: pointer;
  }
}
</style>
