<template lang="pug">
  .p-absolute
</template>

<script>
import googleMaps from '../../utils/googleMaps';
  export default {
    props: {
      value: { type: Array, required: true },
      edition: { type: Boolean, default: false },
      strokeColor: { type: String, default: '#0f0' },
      fillColor: { type: String, default: '#0f0' },
      options: { type: Object, default: () => ({}) }
    },

    data() {
      return { polygonRef: {}, infoWindowRef: null, }
    },

    created() {
      const { paths, options, $parent, strokeColor, fillColor, edition, value } = this
      this.polygonRef = new window.google.maps.Polygon({
        ...options,
        paths: value,
        map: $parent.map,    
        strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor,
        fillOpacity: 0.35,
        editable: edition,
        draggable: edition
      })

      this.polygonRef.addListener('rightclick', (event) => {
        if (event.vertex > -1) {
          this.polygonRef.getPath().removeAt(event.vertex)

          const paths = []
          this.polygonRef.getPath(0).forEach(path => {
            paths.push({lat: path.lat(), lng: path.lng()})
          })

          this.value.splice(0)
          this.value.push(...paths)
          this.polygonRef.setPath(paths)
        }
      })
    },

    watch: {
      value(newValue) {
        this.polygonRef.setPath(newValue)
      },
      
      edition(newEditionValue) {
        const paths = []
        this.polygonRef.setDraggable(newEditionValue)
        this.polygonRef.setEditable(newEditionValue)

        if (this.polygonRef.getPath(0)) {
          this.polygonRef.getPath(0).forEach(path => {
            paths.push({lat: path.lat(), lng: path.lng()})
          })
        }
        this.polygonRef.setPath(paths)
      },
    },

    destroyed() {
      this.polygonRef.setMap(null)
    }
  }
</script>

<style lang="stylus" scoped>
  .p-absolute
    position absolute
</style>