<template lang="pug">
  main.main
    .login-container
      h1.page-title Login
      form( @submit.prevent="login" )
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
  @apply bg-black text-white flex items-center justify-center w-full
  height: calc(100vh - 55px) // THIS SUCKS!

.login-container
  @apply text-center

.page-title
  @apply text-5xl font-black p-2

.link
  color: inherit

.password-reset
  @apply text-grey-light

.error-text
  @apply text-red m-2
</style>
