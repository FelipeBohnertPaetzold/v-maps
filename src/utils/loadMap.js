import asyncJs from './asyncJs'

export default async apiKey => {
  if (!window.google || !window.google.maps) {
    await asyncJs(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
  }
}
