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

        this.addListeners()

        this.showSlot = true
      },
      addListeners() {
        mapEvents.forEach(mappedEvent => {
          this.map.addListener(mappedEvent.event, () => {
            this.$emit(mappedEvent.emit, this.map)
          })
        })
      }
    },
    async created() {
      try {
        await googleMaps.load(this.apiKey)
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
