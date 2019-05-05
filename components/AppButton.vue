<template lang="pug">
  button.button(
    v-on="listeners"
    v-bind="$attrs"
    :class=`{
      'button--rounded': r
    }`
  )
    slot
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    r: {
      type: Boolean
    },
  },
  components: {
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.button
  @apply block border-none py-3 px-10 font-bold
  border-radius: 5px
  color: inherit
  background-color: rgba(119, 119, 119, 0.2)

  &:hover
    background-color: rgba(119, 119, 119, 0.3)

  &--rounded
    @apply rounded-full
</style>
