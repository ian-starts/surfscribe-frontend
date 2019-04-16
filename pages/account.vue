<template lang="pug">
  main.main
    h1.page-title Account
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.main
  @apply bg-black text-white

.page-title
  @apply text-5xl font-black
</style>
