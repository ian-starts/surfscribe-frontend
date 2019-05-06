<template lang="pug">
  .select-container(
    :class=`{
      'select-container--right': right
    }`
  )
    label.input-label {{ label }}
      select.select(
        :value="value"
        v-on="listeners"
        v-bind="$attrs"
        :class=`{
          'select--round': round
        }`
      )
        option( v-for="option in options" :value="option.value" ) {{option.title}}
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Number
    },
    options: {
      type: Array,
      validator: a => a.every(o => o.value && o.title)
    },
    label: {
      type: String
    },
    right: { type: Boolean },
    round: { type: Boolean },
  },
  components: {
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => {
          this.$emit('input', parseInt(event.target.value))
          console.log(parseInt(event.target.value))
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

<style lang="scss" scoped>
.select-container {
  display: flex;
  flex-direction: column;

  &--right {
    align-items: flex-end;
  }
}

.select {
  display: block;
  border: none;
  //width: 100%;
  max-width: 360px;
  margin: 8px 0;
  border-radius: 5px;
  background-color: rgb(236, 237, 238);
  padding: .35em .7em;
  font-weight: bold;
  font-size: 0.75rem;
  // custom caret
  appearance: none;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk0OS4wMDAwMDAsIC00NTYuMDAwMDAwKSIgZmlsbD0iIzEzMTMxMyI+ICAgICAgICAgICAgPHBhdGggZD0iTTk0OS44MzYyNzIsNDYwLjE3OTAwOCBMOTU1LjU4NTc4Niw0NjUuOTI4NTIzIEM5NTYuMzY2ODM1LDQ2Ni43MDk1NzEgOTU3LjYzMzE2NSw0NjYuNzA5NTcxIDk1OC40MTQyMTQsNDY1LjkyODUyMyBMOTY0LjE2MzcyOCw0NjAuMTc5MDA4IEM5NjQuOTQ0Nzc3LDQ1OS4zOTc5NiA5NjQuOTQ0Nzc3LDQ1OC4xMzE2MyA5NjQuMTYzNzI4LDQ1Ny4zNTA1ODEgQzk2My43ODg2NTUsNDU2Ljk3NTUwOCA5NjMuMjc5OTQ3LDQ1Ni43NjQ3OTUgOTYyLjc0OTUxNCw0NTYuNzY0Nzk1IEw5NTEuMjUwNDg2LDQ1Ni43NjQ3OTUgQzk1MC4xNDU5MTYsNDU2Ljc2NDc5NSA5NDkuMjUwNDg2LDQ1Ny42NjAyMjUgOTQ5LjI1MDQ4Niw0NTguNzY0Nzk1IEM5NDkuMjUwNDg2LDQ1OS4yOTUyMjggOTQ5LjQ2MTE5OSw0NTkuODAzOTM2IDk0OS44MzYyNzIsNDYwLjE3OTAwOCBaIiA+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+);
  background-size: 14px;
  background-position: right 8px center;
  background-repeat: no-repeat;
  padding-right: 14px + 8px + 2px;

  &--round {
    border-radius: 999px;
  }
}
</style>
