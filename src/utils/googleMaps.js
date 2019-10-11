import asyncJs from './asyncJs'
import queryString from './queryString'

class GoogleMaps {
  promise = null

  get loaded() {
    return window.google && window.google.maps
  }

  load(params) {
    if (params.apiKey) {
      console.warn('apiKey is deprecated! Please use key')
      params.key = params.apiKey
    }
    if (!this.loaded && !this.promise) {
      this.promise = asyncJs(`https://maps.googleapis.com/maps/api/js?${queryString(params)}`)
    }
    return this.promise
  }
}

export default new GoogleMaps()

