import asyncJs from './asyncJs'

class GoogleMaps {
  promise = null

  get loaded() {
    return window.google && window.google.maps
  }

  load(apiKey) {
    if (!apiKey && !this.promise) {
      throw new Error('Google API key not provided')
    }
    if (!this.loaded && !this.promise) {
      this.promise = asyncJs(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
    }
    return this.promise
  }
}

export default new GoogleMaps()

