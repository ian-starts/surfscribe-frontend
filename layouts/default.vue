<template lang="pug">
  .site
    nav.nav
      .nav__container
        a.nav__logo( href="/" ) SS
        AppInput.mx-6.my-2( v-model="query" )
        .nav__links
          a.nav__link( href="/my-spots" ) My Spots
          template
            a.nav__link( v-if="$store.state.auth.loggedIn" href="/account" ) Account
            a.nav__link( v-else href="/login" ) Login
    nuxt
</template>

<script>
import AppInput from '@/components/AppInput.vue'

export default {
  components: {
    AppInput
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    query: {
      immediate: true,
      handler () {
        this.$store.dispatch('locations/getLocations', { query: this.query })
      }
    }
  }
}
</script>


<style lang="sass">
  $nav-height: 55px

  html
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
    font-size: 16px
    word-spacing: 1px
    -ms-text-size-adjust: 100%
    -webkit-text-size-adjust: 100%
    -moz-osx-font-smoothing: grayscale
    -webkit-font-smoothing: antialiased
    box-sizing: border-box

  *,
  *:before,
  *:after 
    box-sizing: border-box
    margin: 0

  .site
    padding-top: $nav-height

  .nav
    @apply fixed pin-t w-full flex justify-center bg-black
    height: $nav-height

    &__container
      @apply h-full max-w-xl p-4 flex-grow flex flex-row items-center justify-between

    &__logo
      @apply font-semibold text-xl text-white no-underline

    &__links
      @apply flex items-center flex-grow justify-end

    &__link
      @apply text-white font-semibold no-underline m-2

      &:hover
        @apply underline
</style>
