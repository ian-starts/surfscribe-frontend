<template lang="pug">
  .site
    nav.nav
      .nav__container
        .nav__logo
          | SS
        .nav__links
          a.nav__link( href="/my-spots" ) My Spots
          a.nav__link( href="/account" ) Account
    nuxt
</template>


<style lang="sass">
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

  .nav
    @apply flex justify-center bg-black
    height: 55px

    &__container
      @apply h-full max-w-xl p-4 flex-grow flex flex-row items-center justify-between

    &__logo
      @apply font-semibold text-xl text-white

    &__links
      @apply flex items-center flex-grow justify-end

    &__link
      @apply text-white font-semibold no-underline m-2

      &:hover
        @apply underline
</style>
