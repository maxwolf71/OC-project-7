<template>
  <div class="editBio">
    <Nav title="Edit Bio" />
    <div class="newBio">
      <form class="formCreate" @submit.prevent="editBio">
        <div class="formNewBio">
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
import Nav from "@/components/Nav"
import axios from "axios"

export default {
  name: "Bio",
  components: { Nav },
  data() {
    return {
      bio: "",
    }
  },
  methods: {
    editBio() {
      const formCreate = document.getElementsByClassName("formCreate")[0]
      let data = new FormData(formCreate)

      const userId = this.$store.state.user.userId
      const token = this.$store.state.user.token

      axios
        .put(`http://localhost:3000/api/users/bio/${userId}`, data, {
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
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>