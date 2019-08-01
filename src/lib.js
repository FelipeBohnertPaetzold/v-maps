import VMap from './components/VMap'
import VMarker from './components/VMarker'
import googleMaps from './utils/googleMaps'

export { VMap, VMarker }

export default {
  install(Vue, { apiKey = '' }) {
    googleMaps.load(apiKey)
    Vue.component('v-map', VMap)
    Vue.component('v-marker', VMarker)
  }
}