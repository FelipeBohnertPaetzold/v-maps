<template lang="pug">
  div(:id="mapId")
    slot(:map="map" v-if="showSlot")
</template>

<script>
  import loadMap from '../utils/loadMap'
  import mapEvents from './mapEvents'

  export default {
    props: {
      apiKey: { type: String, required: true },
      mapId: { type: String, default: () => 'map' },
      options: { type: Object, default: () => ({}) },
      center: { type: Object, required: true },
      zoom: { type: Number, default: () => 4 }
    },
    data() {
      return { map: null, showSlot: false }
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
      await loadMap(this.apiKey)

      this.initMap()
    }
  }
</script>