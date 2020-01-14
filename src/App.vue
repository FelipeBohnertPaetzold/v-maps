<template lang="pug">
  #app
    .flex-box-centered
      div
        v-map.map(
          :center="center"
          :zoom="18"
          @bounds-changed="focusEvent('bounds-changed')"
          @center-changed="focusEvent('center-changed')"
          @click="onClick"
          @double-click="focusEvent('double-click')"
          @drag="focusEvent('drag')"
          @drag-end="focusEvent('drag-end')"
          @drag-start="focusEvent('drag-start')"
          @heading-changed="focusEvent('heading-changed')"
          @idle="focusEvent('idle')"
          @map-type-id-changed="focusEvent('map-type-id-changed')"
          @mouse-move="focusEvent('mouse-move')"
          @mouse-out="focusEvent('mouse-out')"
          @mouse-over="focusEvent('mouse-over')"
          @projection-changed="focusEvent('projection-changed')"
          @resize="focusEvent('resize')"
          @right-click="focusEvent('right-click')"
          @tiles-loaded="focusEvent('tiles-loaded')"
          @tilt-changed="focusEvent('tilt-changed')"
          @zoom-changed="focusEvent('zoom-changed')"
        )
          v-marker(:position="center" :info-window="infoWindow")
          v-polygon(:paths="polygonPaths" :draggable="shapeEdition === 'polygon'" :editable="shapeEdition === 'polygon'" @path-changed="pathChangeHandler")
        .shape-options
          label(for="disabledEdition") None
            input#disabledEdition(type="radio" name="shapes" value="" v-model="shapeEdition")
          label(for="polygonEdition") Polygon Draw
            input#polygonEdition(type="radio" name="shapes" value="polygon" v-model="shapeEdition")
          label(for="polylineEdition") Polyline Draw
            input#polylineEdition(type="radio" name="shapes" value="polyline" v-model="shapeEdition")
      .events-box
        h1 Map Events
        .event(v-for="event in events" :class="{active: focused.indexOf(event) > -1}") {{ event }}
</template>

<script>
import mapEvents from "./components/mapEvents";

export default {
  name: "app",
  computed: {
    events() {
      return mapEvents.map(i => i.emit);
    },
    infoWindow() {
      return (
        "" +
        "<h1>Hello World</h1>" +
        "<p class='paragraph'>This is a info window support for v-maps. ;)</p>"
      );
    }
  },
  data() {
    return { 
      center: { lat: -23.4070511, lng: -51.9428867 },
      focused: [],
      polygonPaths: [],
      shapeEdition: ''
    }
  },
  methods: {
    onClick({map, event}) {
      this.focusEvent('click')    
      if (this.shapeEdition === 'polygon') {
        this.polygonPaths.push({lat: event.latLng.lat(), lng: event.latLng.lng()})
      }
    },
    pathChangeHandler(newPath) {
      this.polygonPaths = [...newPath]
    },
    focusEvent(eventString) {
      const index = this.focused.findIndex(i => i === eventString);
      if (index > -1) {
        clearTimeout(this[eventString]);
        this.focused.shift(eventString);
      }
      this.focused.push(eventString);
      this[eventString] = setTimeout(() => {
        this.focused.shift(eventString);
      }, 1200);
    }
  }
};
</script>

<style lang="stylus">
  *
    font-family "Helvetica Neue"
    margin 0
    padding 0
    color #444

  h1
    font-size 1.2rem

  p.paragraph
    font-size .9rem
    font-weight normal
    padding-top .4rem

  body  
    margin 0
    padding 0

  .flex-box-centered
    height 100vh
    width 100%
    align-items center
    justify-content center
    display flex
    flex-wrap wrap

    .map
      border-radius 15px
      width 60vh
      height 60vh
      max-width 800px
      max-height 800px

    .shape-options
      display flex
      align-items center
      flex-wrap wrap
      padding 10px

      label
        margin-right 20px

        input
          float left
          margin-right 5px

    .events-box
      padding 2rem
      color #444

      .event
        padding 2.5px 5px
        border-radius 5px
        margin-bottom 1px
        background-color #fff
        transition 0.4s

        &.active
          background-color #8e44ad
          color #ecf0f1

</style>
