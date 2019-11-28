<template lang="pug">
  div(:id="mapId")
    .error-box(v-if="error") {{ error }}
    slot(:map="map" v-if="showSlot && !error")
</template>

<script>
  import googleMaps from '../utils/googleMaps'
  import mapEvents from './mapEvents'

  export default {
    props: {
      apiOptions: { type: Object, default: () => ({}) },
      apiKey: { type: String, default: () => '' },
      mapId: { type: String, default: () => 'map' },
      options: { type: Object, default: () => ({}) },
      center: { type: Object, required: true },
      zoom: { type: Number, default: () => 4 }
    },
    data() {
      return { map: null, showSlot: false, error: '' }
    },
    methods: {
      initMap() {
        const { center, zoom } = this
        this.map = new window.google.maps.Map(document.getElementById(this.mapId), {
          ...this.options,
          center,
          zoom
        })
        window.map = this.map
        this.addListeners()

        this.showSlot = true
      },
      addListeners() {
        mapEvents.forEach(mappedEvent => {
          this.map.addListener(mappedEvent.event, (event) => {
            this.$emit(mappedEvent.emit, {map: this.map, event})
          })
        })
      }
    },
    async created() {
      try {
        const apiOptions = { ...this.apiOptions, key: this.apiKey || this.apiOptions.key }
        await googleMaps.load(apiOptions)
        this.initMap()
      } catch (e) {
        this.error = e.message
      }
    }
  }
</script>

<style lang="stylus">
  .error-box
    height 100%
    display flex
    align-items center
    justify-content center
    color orangered
    background-color #fafafa
</style>
