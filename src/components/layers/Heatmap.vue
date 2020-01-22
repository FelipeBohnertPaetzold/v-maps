<template lang="pug">
  .p-absolute
</template>

<script>
export default {
  props: {
    points: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  computed: {
    heatmapPoints() {
      return this.points.map(({ lat, lng, ...rest }) => ({
        location: new window.google.maps.LatLng(lat, lng),
        ...rest,
      }))
    },
  },
  watch: {
    heatmapPoints() {
      this.heatmapRef.setData(this.heatmapPoints)
    },
  },
  methods: {
    createHeatmap() {
      const { $parent } = this
      this.heatmapRef = new window.google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        ...this.options,
        map: $parent.map,
      })
      this.heatmapRef.setMap($parent.map)
    },
    clearHeatmap() {
      this.heatmapRef.setMap(null)
    },
  },
  created() {
    this.createHeatmap()
  },
  destroyed() {
    this.clearHeatmap()
  },
}
</script>

<style lang="stylus" scoped>
.p-absolute
  position absolute
</style>
