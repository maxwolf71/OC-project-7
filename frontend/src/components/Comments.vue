<template>
  <div class="">
    <div class="card" v-for="comment in comments" :key="comment.id">
      <h1 class="card__subtitle">{{ comment.content }}</h1>
      <p class="card__title">
        Published by {{ comment.firstName }} {{ comment.lastName }} on
        {{ dateOfComment(comment.createdAt) }}
      </p>
      <div
        class="button"
        v-if="comment.userId == userId"
        @click="deleteComment(comment.id)"
      >
        Delete comment
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

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
      const messageId = this.$route.params.id
      const token = this.$store.state.user.userId

      axios
        .get(`http://localhost:3000/api/${messageId}/allcomments/`, {
          headers: {
            "Content-Type": "application/json",
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
      const event = new Date(date)
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }

      return event.toLocaleDateString("en-En", options)
    },

    deleteComment(commentId) {
      const token = this.$store.state.user.token

      axios
        .delete(`http://localhost:3000/api/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res) {
            console.log(res)
            alert("Your comment has been deleted")
            window.location.reload()
          }
        })
        .catch(error => {
          console.log(error)
          alert("You can't delete comments other than your own !")
        })
    },
  },
}
</script>

<style>
</style>