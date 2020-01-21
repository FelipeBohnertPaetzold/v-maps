<template lang="pug">
  .p-absolute
</template>

<script>
export default {
  props: {
    points: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  created() {
    const { $parent, points } = this
    const heatmapData = points.map(({ lat, lng, ...rest }) => ({
      location: new window.google.maps.LatLng(lat, lng),
      ...rest,
    }))
    this.heatmapRef = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      ...this.options,
      map: $parent.map,
    })
    this.heatmapRef.setMap($parent.map)
  },
  destroyed() {
    this.heatmapRef.setMap(null)
  },
}
</script>

<style lang="stylus" scoped>
.p-absolute
  position absolute
</style>
