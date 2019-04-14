<template lang="pug">
  main.main
    .cards
      AppSurfCard(
        v-for="location in locations"
        :key="location.id"
        :style="`background-image: url(${getCoverImage(location)});`"
        @click.native="setSelectedLocation(location.id)"
      )
    .info-panel
      .max-w-xl.m-auto.p-4.text-white( v-if="selectedLocation" )
        h1.text-5xl {{selectedLocation['wave_break']}}
        p.text-sm.font-light
          span.text-red.font-bold {{selectedLocation['country_name']}} 
          | // {{selectedLocation['region_name']}}
        br
        h2.font-bold.text-sm( style="line-height: 1.7em;" ) Description
        p.text-sm.font-light( style="max-width: 360px; line-height: 1.3em;" ) {{selectedLocation['description']}}
</template>

<script>
import AppSurfCard from '~/components/AppSurfCard.vue'

export default {
  components: {
    AppSurfCard
  },
  data () {
    return {
      selectedLocationId: null
    }
  },
  created () {
    this.$store.dispatch('locations/getLocations')
    console.log(this.$store.state)
  },
  computed: {
    locations () {
      return this.$store.state.locations.locations
    },
    selectedLocation () {
      return this.locations.find(location => location.id === this.selectedLocationId) || this.locations[0] || null
    }
  },
  methods: {
    setSelectedLocation (id) {
      this.selectedLocationId = id
    },
    getCoverImage(location) {
      try {
        return location.images[0].dimensions.full.url
      } catch {
        return ''
      }
    },
    login () {
      this.$auth.loginWith('local', {
        data: {
          username: 'your_username',
          password: 'your_password'
        }
      })
    }
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
