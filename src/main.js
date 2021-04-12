import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import ArgonDashboard from '@/plugins/argon-dashboard'

import App from './App.vue'
import router from './router'
import store from './store'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ArgonDashboard)

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
