<template lang="pug">
  main.main
    .cards
      AppSurfCard( v-for="i in 9" :key="i" )
    .info-panel
      .max-w-xl.m-auto.p-4
        h1.text-white.text-5xl Beirut
        p.text-white.text-sm.font-light 4m breaks // Kurtis Blow
</template>

<script>
import AppSurfCard from '~/components/AppSurfCard.vue'

export default {
  components: {
    AppSurfCard
  }
}
</script>

<style lang="sass" scoped>
.main
  @apply bg-black

.cards
  @apply min-h-screen w-full flex flex-wrap content-start

.info-panel
  @apply fixed pin-b w-full h-64 bg-black
</style>
