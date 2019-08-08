import asyncJs from './asyncJs'
import queryString from './queryString'

class GoogleMaps {
  promise = null

  get loaded() {
    return window.google && window.google.maps
  }

  load(params) {
    if (!params.key && !this.promise) {
      throw new Error('Google API key not provided')
    }
    if (!this.loaded && !this.promise) {
      console.log(`https://maps.googleapis.com/maps/api/js?${queryString(params)}`)
      this.promise = asyncJs(`https://maps.googleapis.com/maps/api/js?${queryString(params)}`)
    }
    return this.promise
  }
}

export default new GoogleMaps()

