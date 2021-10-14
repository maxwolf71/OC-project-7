<template>
  <div class="banner">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: { title: String }
}
</script>
