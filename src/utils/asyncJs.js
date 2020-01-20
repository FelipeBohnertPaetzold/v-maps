export default url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.onload = () => {
      resolve()
      script.remove()
    }
    script.onerror = e => reject(e)
    document.body.appendChild(script)
  })
}
