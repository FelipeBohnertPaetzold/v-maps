<template lang="pug">
  .p-absolute
</template>

<script>
export default {
  props: {
    position: { type: Object, required: true },
    infoWindow: { type: String },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return { markerRef: null, infoWindowRef: null }
  },
  methods: {
    addInfoWindow() {
      this.infoWindowRef = new window.google.maps.InfoWindow({
        content: this.infoWindow,
      })
      this.markerRef.addListener('click', () => {
        this.infoWindowRef.open(map, this.markerRef)
      })
    },
  },

  created() {
    const { position, options, $parent } = this
    this.markerRef = new window.google.maps.Marker({
      ...options,
      position,
      map: $parent.map,
    })
    if (this.infoWindow) {
      this.addInfoWindow()
    }
  },
  destroyed() {
    this.markerRef.setMap(null)
  },
  watch: {
    position: {
     handler(coords){
      if(!coords) return
      const { lat, lng } = coords
      const latlng = new google.maps.LatLng(lat, lng)
      this.markerRef.setPosition(latlng)
     },
     deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-absolute
  position absolute
</style>
