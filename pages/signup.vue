<template lang="pug">
  main.main
    .login-container
      .page-header
        video.page-header__video( loop="" autoplay="" muted="" )
          source( src="/break-background.mp4" type="video/mp4" )
        img.page-header__overlay( src="./signup/assets/header-cutout.svg" alt="Sign up" )
      p.paragraph Sign up to surfscribe, already have an account? Login 
        router-link.link( to="{ name: 'login'}" ) here
        | .
      form.login-form( @submit.prevent="registerUser" )
        AppInput.my-4( v-model="email" type="email" placeholder="email" )
        AppInput.my-4( v-model="password" type="password" placeholder="password" )
        .error-text( v-if="error" ) {{error}}
        button( type="submit" ) Submit
</template>

<script>
import AppInput from '@/components/AppInput'

export default {
  components: {
    AppInput
  },
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    registerUser () {
      return this.$axios.$post('api/auth/signup', {
        email: this.email,
        password: this.password
      })
        .catch(error => this.error = error.response.data.error)
    }
  }
}
</script>

<style lang="sass" scoped>
.main
  @apply bg-black text-white flex justify-center w-full
  height: calc(100vh - 55px) // THIS SUCKS!

.login-container
  @apply text-center m-12
  max-width: 320px

.page-title
  @apply text-5xl font-black p-2

.page-header
  @apply w-full relative overflow-hidden
  padding-top: 75% // object height relative to it's width

  &__video
    @apply absolute pin h-full
    padding: 1px // removes the hairline border trough wrong rendering
    object-fit: cover
  
  &__overlay
    @apply absolute pin w-full
    object-fit: cover

.paragraph
  @apply text-sm font-light leading-tight py-3 pb-2

.link
  color: inherit

.login-form
  width: calc(100% - 24px)
  margin: auto

.password-reset
  @apply text-grey-light

.error-text
  @apply text-red m-2

@keyframes Gradient 
  0% 
    background-position: 0% 50%, center
  50% 
    background-position: 100% 50%, center
  100% 
    background-position: 0% 50%, center

</style>
