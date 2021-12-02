<template>
  <div class="createComment">
    <h2>Comment this message :</h2>
    <div class="NewComment">
      <label for="content"></label>
      <textarea 
        name="content" placeholder="Enter comment text here" v-model="content">
      </textarea>
    </div>
    <div class="">
      <button type="submit" class="button" @click="createComment">
        Create comment
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
      content: '',
      comments: []
    }
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
          .then(response => {
            this.comment = response.data
            this.$emit('newComment', this.comment)
            location.reload()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('Please fill in comment !')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.createComment {
  color: $lightRed;
  background: $blue;
  text-align: center;
  max-width: 100%;
  width: 540px;
  border-radius: 16px;
  padding: 10px;
  border: 4px solid $lightRed;
  margin: 0 auto 100px;

  textarea {
    width: 80%;
    text-align: center;
  }
  .button {
    width: 30%;
    padding: 10px;
  }
}
</style>
