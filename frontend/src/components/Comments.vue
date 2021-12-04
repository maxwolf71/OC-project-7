<template>
  <div>
    <div class="commentCard" v-for="comment in comments" :key="comment.id">
      <h1 class="commentCard__content">{{ comment.content }}</h1>
      <p class="commentCard__title" v-if="comment.id != null">
        Published by {{ comment.firstName }} {{ comment.lastName }} on
        {{ dateOfComment(comment.createdAt) }}
      </p>
      <div class="button" v-if="comment.userId == userId || this.$store.state.user.isAdmin == true" @click="deleteComment(comment.id)">
        Delete comment
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comments",
  data() {
    return {
      comments: [],
      userId: this.$store.state.user.userId,
    }
  },
  mounted() {
    this.displayComments()
  },
  methods: {
    displayComments() {
      const messageId = this.$route.params.id;
      const token = this.$store.state.user.userId;

      axios
        .get(`http://localhost:3000/api/${messageId}/allcomments/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(comments => {
          this.comments = comments.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    dateOfComment(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }

      return event.toLocaleDateString("en-En", options);
    },

    deleteComment(commentId) {
      const token = this.$store.state.user.token;

      axios
        .delete(`http://localhost:3000/api/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res) {
            alert('The comment has been deleted !')
            location.reload()
          }
        })
        .catch((error) => {
          console.log(error);
          alert("You can't delete other users messages !");
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.commentCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid $white;
  border-radius: 20px;
  color: $white;
  padding: 10px;
  width: 540px;
  background-color: $mainRed;
  border-radius: 20px;
  margin: 10px auto 10px;

  &__content {
    border: 2px solid $white;
    border-radius: 20px;
    padding: 15px;
  }

  & .button {
    text-align: center;
    width: 30%;
    padding: 5px;
    margin: 5px auto;
  }
}
</style>