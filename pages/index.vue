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
      .info-panel__content( v-if="selectedLocation && selectedForecast" )
        // -- Title section --
        .content-section
          h1.text-5xl.font-black {{selectedLocation['waveBreak']}}
          p.text-body.py-2
            span.text-red.font-bold {{selectedLocation['countryName']}} 
            | // {{selectedLocation['regionName']}}
        // -- Description --
        .content-section
          h2.section-title( style="line-height: 1.7em;" ) Description
          p.text-body {{selectedLocation['description']}}
        // -- Swell section --
        .content-section
          h2.section-title Swell
          p.text-body Swell direction is the direction the swell is coming from, as opposed to the direction it is heading toward.
          div.flex.justify-between.py-4
            AppDataTag( :value="selectedForecast.swell.height" )
              template( #label )
                span Height 
            AppDataTag( :value="selectedForecast.swell.period" )
              template( #label )
                span Period
            AppDataTag( :value="selectedForecast.swell.compassDirection" )
              template( #label )
                span Direction
        // -- Wind section --
        .content-section
          h2.section-title Wind
          p.text-body Wind is the flow of gases on a large scale. On the surface of the Earth, wind consists of the bulk movement of air. 
          div.flex.justify-between.py-4
            AppDataTag( :value="selectedForecast.wind.speed" )
              template( #label )
                span Speed 
            AppDataTag( :value="selectedForecast.wind.compassDirection" )
              template( #label )
                span Direction
            AppDataTag( :value="selectedForecast.wind.gusts" )
              template( #label )
                span Gusts
</template>

<script>
import AppSurfCard from '@/components/AppSurfCard.vue'
import AppDataTag from '@/components/AppDataTag.vue'

export default {
  components: {
    AppSurfCard,
    AppDataTag,
  },
  data () {
    return {
      selectedLocationId: null,
      forecasts: []
    }
  },
  created () {
    this.$store.dispatch('locations/getLocations')
  },
  computed: {
    locations () {
      return this.$store.state.locations.locations
    },
    selectedLocation () {
      return this.locations.find(location => location.id === this.selectedLocationId) || this.locations[0] || null
    },
    selectedForecast () {
      return this.forecasts[0] || null
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
    fetchForecasts() {
      this.$axios.$get(`/api/forecasts/${this.selectedLocation.slug}`)
        .then(json => this.forecasts = json)
    }
  },
  watch: {
    selectedLocation (val) {
      this.fetchForecasts()
      console.log(this.selectedForecast)
    }
  }
}
</script>

<style lang="sass" scoped>
.main
  @apply bg-black

.cards
  @apply min-h-screen w-full flex flex-wrap content-start

.section-title
  @apply font-bold text-sm mb-2

.text-body
  @apply text-sm font-light leading-tight

.info-panel
  @apply fixed pin-b w-full h-64 bg-black overflow-x-scroll

  &__content
    @apply m-auto px-6 py-4 text-white flex flex-wrap

.content-section
  @apply p-4
  width: 340px
</style>
