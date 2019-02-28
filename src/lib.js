import VMap from './components/VMap'
import VMarker from './components/VMarker'

export { VMap, VMarker }

export default {
  install(Vue) {
    Vue.component('v-map', VMap)
    Vue.component('v-marker', VMarker)
  }
}