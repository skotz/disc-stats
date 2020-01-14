import Vue from 'vue'
import App from './App.vue'

import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
