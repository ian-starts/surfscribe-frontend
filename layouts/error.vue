<template lang="pug">
  main.main
    .fof-container
      h1.page-title {{error.statusCode}}
      p( v-if="error.statusCode === 404" ) Sorry, this page does not exist :(
      p( v-else ) An error occurred
      div.home-link
        a.link( href="/") Go home
</template>

<script>

export default {
  props: ['error'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.main
  @apply bg-black text-white flex items-center justify-center w-full
  height: calc(100vh - 55px) // THIS SUCKS!

.fof-container
  @apply text-center

.page-title
  @apply text-5xl font-black p-2

.link
  color: inherit

.home-link
  @apply m-2
</style>
