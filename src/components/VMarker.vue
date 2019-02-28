<template lang="pug">
  .p-absolute
</template>

<script>
  export default {
    props: {
      position: { type: Object, required: true },
      options: { type: Object, default: () => ({}) }
    },
    data() {
      return { marker: null }
    },
    created() {
      const { position, options, $parent } = this
      this.marker = new window.google.maps.Marker({
        ...options,
        position,
        map: $parent.map
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .p-absolute
    position absolute
</style>