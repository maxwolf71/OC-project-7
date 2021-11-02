<template>
  <div class="createPost">
    <Banner title="Edit Bio" />
    <div class="newPost">
      <form class="formCreate" @submit.prevent="editBio">
        <div class="formNewPost">
          <label for="bio"></label>
          <textarea
            name="bio"
            class="contentNewBio"
            placeholder="New bio here"
            v-model="bio"
          ></textarea>
          <br />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner"
import axios from "axios"

export default {
  name: "Bio",
  components: { Banner },
  data() {
    return {
      bio: "",
    }
  },
  methods: {
    editBio() {
      const userId = this.$store.state.user.userId
      const token = this.$store.state.user.token

      axios
        .put(`http://localhost:3000/api/users/bio/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res) {
            alert("You're bio has been updated")
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
  },
}
</script>