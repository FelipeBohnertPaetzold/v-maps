import Vue from 'vue'
import App from './App.vue'
import VMaps from './lib'

Vue.config.productionTip = false

Vue.use(VMaps, { version: '2.8' })
new Vue({
  render: h => h(App),
}).$mount('#app')
