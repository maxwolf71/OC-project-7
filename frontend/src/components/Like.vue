<template>
  <div class="like">
    <fa icon="heart" @click="createLike" class="notLiked" />
    <p>{{ likes }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Like",
  data() {
    return {
      likes: [],
    }
  },
  mounted() {
    const messageId = this.$route.params.id;

    axios
      .get(`http://localhost:3000/api/messages/${messageId}`)
      .then(response => {
        this.likes = response.data.likes
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    createLike() {
      const messageId = this.$route.params.id;
      const token = this.$store.state.user.token;

      axios
        .post(
          `http://localhost:3000/api/messages/${messageId}/vote/like`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(result => {
          if (result.data.message == "Message liked !") {
            this.likes++
            document.querySelector('.notLiked').classList.add('liked')
            document.querySelector('.liked').classList.remove('notLiked')
          } else if (result.data.message == "I no longer like this message !") {
            this.likes--
            document.querySelector('.liked').classList.add('notLiked')
            document.querySelector('.liked').classList.remove('liked')
          }
        })
        .catch((error) => {
          console.log(error);
          alert("unable to like message !");
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.like {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $mainRed;
  background-color: $white;
  border-radius: 30px;
  font-size: 2rem;
  transform-style: 4s;
  width: 20%;
  height: 50px;
  margin: 10px auto;
  
  & .notLiked {
    color: $lightRed;
    transition: .4s;
  }
  & .liked {
    color: $mainRed;
    transition: .4s;
  }
  p {
    padding-left: 15px;
  }
}
</style>