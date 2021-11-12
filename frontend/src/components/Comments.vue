<template>
  <div class="">
      <div class="comments" v-for="comment in comments" :key="comment.id">
        <h1>{{ comment.content }}</h1>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Comments',
    data() {
        return {
            comments: []
        }
    },
    created() {
    axios
      .get("http://localhost:3000/api/comments")
      .then(comments => {
        this.comments = comments.data
      })
      .catch((err) => {
        console.log(err.message)
      })
  },
  methods: {
    dateOfComment(date) {
      const event   = new Date(date)
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}

      return event.toLocaleDateString('en-En', options)
    } 
  }
}
</script>

<style>

</style>