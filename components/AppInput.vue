<template lang="pug">
  .input-container
    label.input-label {{ label }}
      input.input( :value="value" v-on="listeners" v-bind="$attrs" )
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
    }
  },
  components: {
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', event.target.value)
        }
      }
    }
  },
  methods: {
    setInputValue(i) {
      this.$emit('input', i)
    }
  }
}
</script>

<style lang="sass" scoped>
.input
  @apply block border-none  w-full py-3 px-4 font-bold
  border-radius: 5px
  color: inherit
  background-color: #86868657
</style>
