<template lang="pug">
  #app
    .flex-box-centered
      v-map.map(:api-key="apiKey" :center="center" :zoom="18")
        v-marker(:position="center")
</template>

<script>
  import VMap from './components/VMap'
  import VMarker from './components/VMarker'

  export default {
    name: 'app',
    computed: {
      apiKey() {
        return 'AIzaSyAguspW0GvJDNxK3w6kwdqdghJbPlcf82c'
      }
    },
    data() {
      return { center: { lat: -23.4070511, lng: -51.9428867 } }
    },
    components: { VMap, VMarker }
  }
</script>

<style lang="stylus">
  body
    margin 0
    padding 0
  .flex-box-centered
    height 100vh
    width 100%
    align-items center
    justify-content center
    display flex
    flex-direction column
    .map
      border-radius 15px
      width 60vw
      height 60vw
</style>
