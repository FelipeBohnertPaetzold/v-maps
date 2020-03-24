<template lang="pug">
.p-absolute
</template>

<script>
import googleMaps from '../../utils/googleMaps'
export default {
  props: {
    path: { type: Array, required: true },
    editable: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
    strokeColor: { type: String, default: '#0f0' },
    options: { type: Object, default: () => ({}) },
  },

  data() {
    return { polylineRef: {} }
  },

  methods: {
    getLatLng(paths) {
      return paths.map(path => ({ lat: path.lat(), lng: path.lng() }))
    },
  },

  created() {
    const { options, $parent, strokeColor, path, editable, draggable } = this
    this.polylineRef = new window.google.maps.Polyline({
      strokeOpacity: 0.8,
      strokeWeight: 2,
      ...options,
      path,
      map: $parent.map,
      strokeColor,
      editable,
      draggable,
    })

    this.polylineRef.addListener('rightclick', event => {
      if (event.vertex > -1) {
        this.polylineRef.getPath().removeAt(event.vertex)

        const paths = []
        this.polylineRef.getPath(0).forEach(path => {
          paths.push({ lat: path.lat(), lng: path.lng() })
        })

        this.path.splice(0)
        this.path.push(...paths)
        this.polylineRef.setPath(paths)
        this.$emit('path-changed', this.getLatLng(this.polylineRef.getPath().i))
      }
    })

    this.polylineRef.addListener('mouseup', () => {
      this.$emit('path-changed', this.getLatLng(this.polylineRef.getPath().i))
    })
  },

  watch: {
    path(newPathValue) {
      this.polylineRef.setPath(newPathValue)
    },

    editable(newEditableValue) {
      const paths = []
      this.polylineRef.setEditable(newEditableValue)

      if (this.polylineRef.getPath()) {
        paths.push(...this.getLatLng(this.polylineRef.getPath().i))
      }
      this.polylineRef.setPath(paths)
      this.$emit('path-changed', this.getLatLng(this.polylineRef.getPath().i))
    },

    draggable(newDraggableValue) {
      const paths = []
      this.polylineRef.setDraggable(newDraggableValue)

      if (this.polylineRef.getPath()) {
        paths.push(...this.getLatLng(this.polylineRef.getPath().i))
      }
      this.polylineRef.setPath(paths)
      this.$emit('path-changed', this.getLatLng(this.polylineRef.getPath().i))
    },
  },

  destroyed() {
    this.polylineRef.setMap(null)
  },
}
</script>

<style lang="stylus" scoped>
.p-absolute
  position absolute
</style>
