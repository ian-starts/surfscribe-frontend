<template lang="pug">
  main.main
    .login-container
      img.page-header( src="./login/assets/header-cutout.svg" alt="Login" )
      p.paragraph Login to surfscribe, haven't got an account yet? Sign up 
        router-link.link( to="{ name: 'signup'}" ) here
        | .
      form.login-form( @submit.prevent="login" )
        AppInput.my-4( v-model="email" type="email" placeholder="email" )
        AppInput.my-4( v-model="password" type="password" placeholder="password" )
        .error-text( v-if="error" ) {{error}}
        // div
          a.link.password-reset( href="#") Forgot password
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
    login () {
      console.log('loggin')
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        }
      })
        .then(console.log)
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
  @apply w-full
  background-image: linear-gradient(225deg, rgba(0,0,0,0.00) 0%, rgba(29,29,29,0.00) 28%, rgba(49,49,49,0.53) 63%, rgba(0,0,0,0.29) 100%), url("../assets/img/ocean-bg.jpg")
  background-size: 400% 400%, cover
  animation: Gradient 15s ease infinite

.paragraph
  @apply text-sm font-light leading-tight py-2

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
