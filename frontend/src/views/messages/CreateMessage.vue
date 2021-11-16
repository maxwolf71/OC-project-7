<template>
  <div class="createPost">
    <div class="card">
      <h2 class="card__title">Enter your text here :</h2>
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

          <div class="card__title">
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
            <label class="card__title" for="attachment"
              >Select Image: <br />
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

export default {
  name: "Message",
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

.card {
  text-align: center;
  max-width: 100%;
  width: 540px;
  background: #fd2d01;
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
  .bio {
  font-weight: bold;
  padding: 20px 0;
  border: 2px solid whitesmoke;
  margin: 20px;
  color: white;
  border-radius: 16px;
}
}
</style>
