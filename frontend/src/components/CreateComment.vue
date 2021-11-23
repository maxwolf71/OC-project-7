<template>
  <div class="createComment">
    <h2>Add a comment</h2>
    <div class="NewComment">
      <label for="content"></label>
      <textarea
        name="content"
        class="contentNewComment"
        placeholder="Text content here"
        v-model="content"
      ></textarea>
    </div>
    <div class="">
      <button type="submit" class="button" @click="createComment">
        Publish
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateComment",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    createComment() {
      const messageId = this.$route.params.id;
      const token = this.$store.state.user.token;
      const content = this.content;

      if (!content == "") {
        axios
          .post(
            `http://localhost:3000/api/comments/${messageId}/new`,
            { content },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            this.comment = response.data;
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/main.scss";

.createComment {
  color: $lightRed;

  .button {
    width: 40%;
  }
}
</style>
