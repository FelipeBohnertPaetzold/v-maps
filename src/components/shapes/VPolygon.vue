<template lang="pug">
  .p-absolute
</template>

<script>
import googleMaps from '../../utils/googleMaps';
  export default {
    props: {
      paths: { type: Array, required: true },
      editable: { type: Boolean, default: false },
      draggable: { type: Boolean, default: false },
      strokeColor: { type: String, default: '#0f0' },
      fillColor: { type: String, default: '#0f0' },
      options: { type: Object, default: () => ({}) }
    },

    data() {
      return { polygonRef: {}, infoWindowRef: null, }
    },

    methods: {
      getLatLng(paths) {
        return paths.map(path => ({ lat: path.lat(), lng: path.lng() }))
      },
    },

    created() {
      const { paths, options, $parent, strokeColor, fillColor, draggable, editable } = this
      this.polygonRef = new window.google.maps.Polygon({
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
        strokeColor,
        fillColor,
        ...options,
        paths,
        map: $parent.map,
        editable: editable,
        draggable: draggable,
      })

      this.polygonRef.addListener('rightclick', (event) => {
        if (event.vertex > -1) {
          this.polygonRef.getPath().removeAt(event.vertex)

          const paths = []
          this.polygonRef.getPath(0).forEach(path => {
            paths.push({lat: path.lat(), lng: path.lng()})
          })

          this.paths.splice(0)
          this.paths.push(...paths)
          this.polygonRef.setPath(paths)
          this.$emit('path-changed', this.getLatLng(this.polygonRef.getPath().g))
        }
      })

      this.polygonRef.addListener('mouseup', () => {
        this.$emit('path-changed', this.getLatLng(this.polygonRef.getPath().g))
      })
    },

    watch: {
      paths(newPathValue) {
        this.polygonRef.setPath(newPathValue)
      },
      
      editable(newEditableValue) {
        const paths = []
        this.polygonRef.setEditable(newEditableValue)

        if (this.polygonRef.getPath()) {
          paths.push(...this.getLatLng(this.polygonRef.getPath().g))
        }
        this.polygonRef.setPath(paths)
        this.$emit('path-changed', this.getLatLng(this.polygonRef.getPath().g))
      },

      draggable(newDraggableValue) {
        const paths = []
        this.polygonRef.setDraggable(newDraggableValue)

        if (this.polygonRef.getPath()) {
          paths.push(...this.getLatLng(this.polygonRef.getPath().g))
        }
        this.polygonRef.setPath(paths)
        this.$emit('path-changed', this.getLatLng(this.polygonRef.getPath().g))
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