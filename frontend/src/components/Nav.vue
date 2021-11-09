<template>
  <nav>
    <h1>{{ title }}</h1>
    <router-link :to="{ name: 'Profile'}">Profile</router-link> |
    <router-link :to="{ name: 'Feed'}">Message feed</router-link> |
    <router-link :to="{ name: 'CreateMessage'}">Post a message</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: { title: String }
}
</script>
