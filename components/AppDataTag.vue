<template lang="pug">
  .tag
    .tag__data
      | {{displayValue}}
    .tag__label
      slot( name="label" )
</template>

<script>
import { tween, easing } from 'popmotion'

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
      displayValue: 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val, oldVal) {
        if(typeof val !== 'number') return this.displayValue = val
        tween({
          from: oldVal || 0,
          to: val,
          ease: easing.easeOut,
          duration: 800
        })
          .pipe(Math.round)
          .start(v => this.displayValue = v)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.tag
  @apply block font-bold
  // width: 60px

  &__label
    @apply text-xs text-center font-normal py-1

  &__data
    @apply text-3xl text-center
    letter-spacing: 1px
    text-stroke: 2px white
</style>
