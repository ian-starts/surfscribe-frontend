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
          AppButton( r ).my-2 surfscribe
        // -- Description --
        // .content-section
          h2.section-title( style="line-height: 1.7em;" ) Description
          p.text-body {{selectedLocation['description']}}
        .content-section
          // -- Swell section --
          .flex.justify-between.py-2
            .flex.items-center
              span.day-picker-item(
                v-for="(val, key) in selectDayOptions"
                @click="setSelectedForecastDay(key)"
                :class=`{
                  'day-picker-item--active': (Number(key) === selectedForecastDay)
                }`
              ) 
                | {{ Number(key) === new Date().getDate() ? 'Today' : key }}
            AppSelect( v-model="selectedForcastIndex" :options="selectDayOptions[selectedForecastDay]" round )
          h2.section-title Swell
          div.flex.justify-between.py-2
            .data-tag
              .data-tag__data
                span {{ selectedForecast.swell.height }} 
              .data-tag__label
                span Height (m)
            .data-tag
              .data-tag__data
                span {{ selectedForecast.swell.period }} 
              .data-tag__label
                span Period
            .data-tag
              .data-tag__data.data-tag__data--square
                AppCompass( :degrees="selectedForecast.swell.trueDirection" style="height: 42px; min-width: 42px;")
              .data-tag__label
                span Direction
          // -- Wind section --
          h2.section-title Wind
          div.flex.justify-between.py-2
            .data-tag
              .data-tag__data
                span {{ selectedForecast.wind.speed }} 
              .data-tag__label
                span Speed ({{ selectedForecast.wind.unit }})
            .data-tag.px-4
              .data-tag__data.data-tag__data--square
                AppCompass( :degrees="selectedForecast.wind.trueDirection" style="height: 42px; min-width: 42px;")               
              .data-tag__label
                span Direction
            .data-tag
              .data-tag__data
                span {{ selectedForecast.wind.gusts }} 
              .data-tag__label
                span Gusts ({{ selectedForecast.wind.unit }})
        .content-section
          iframe.rounded-lg.my-4.w-full(
            height="260px"
            :src="windyLocationWidgetSrc"
            frameborder="0"
          )
</template>

<script>
import groupBy from 'lodash/groupBy'

import AppSurfCard from '@/components/AppSurfCard.vue'
import AppDataTag from '@/components/AppDataTag.vue'
import AppButton from '@/components/AppButton.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppCompass from '@/components/AppCompass.vue'

export default {
  components: {
    AppSurfCard,
    AppDataTag,
    AppButton,
    AppSelect,
    AppCompass,
  },
  data () {
    return {
      selectedLocationId: null,
      forecasts: [],
      selectedForecastDay: new Date().getDate(),
      selectedForcastIndex: 0,
    }
  },
  computed: {
    locations () {
      return this.$store.state.locations.locations
    },
    selectedLocation () {
      return this.locations.find(location => location.id === this.selectedLocationId) || this.locations[0] || null
    },
    selectedForecast () {
      return this.forecasts[this.selectedForcastIndex] || null
    },
    selectDayOptions () {
      const forecast = this.forecasts.map((fc, i) => {
        return {
          day: new Date(fc.localTimestamp * 1000).getDate(),
          title: (str => `${str.slice(17,21)}`)(new Date(fc.localTimestamp * 1000).toString()),
          value: i,
        }
      })
        .filter(fc => fc.day < (new Date().getDate() + 5))

      return groupBy(forecast, 'day')
    },
    windyLocationWidgetSrc () {
      return `https://embed.windy.com/embed2.html?lat=${this.selectedLocation.latitude}&lon=${this.selectedLocation.longitude}&zoom=5&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=47.609&detailLon=-122.331&metricWind=default&metricTemp=default&radarRange=-1`
    }
  },
  methods: {
    setSelectedLocation (id) {
      this.selectedLocationId = id
    },
    setSelectedForecastDay (date) {
      this.selectedForecastDay = Number(date)
      // reset selected forcast
      this.selectedForcastIndex = this.selectDayOptions[this.selectedForecastDay][0].value
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
  @apply font-bold text-sm

.text-body
  @apply text-sm font-light leading-tight

.info-panel
  @apply fixed pin-b w-full bg-black overflow-x-scroll
  height: 380px

  &__content
    @apply m-auto max-w-xl px-6 py-4 text-white flex flex-wrap

.content-section
  @apply p-4 flex-grow
  width: 19rem

.day-picker-item
  @apply text-xs font-bold border-2 border-white rounded-full py-1 px-2 mx-1 cursor-pointer

  &:first-child
    @apply ml-0

  &:hover
    @apply bg-white text-black

  &--active
    @apply bg-white text-black

.data-tag
  @apply block font-bold

  &__label
    @apply text-xs text-center font-normal py-1

  &__data
    @apply text-3xl text-center flex items-center justify-center
    width: 64px
    height: 58px

    background-color: rgba(125,125,125, 0.2)
    border-radius: 10px

    &--square
      @apply px-4
</style>
