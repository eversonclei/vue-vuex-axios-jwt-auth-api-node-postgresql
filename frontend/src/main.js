import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO!
//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkV2ZXJzb24gQ2xlaSIsImVtYWlsIjoiZXZlcnNvbi5jbGVpQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE3MTU4MzIsImV4cCI6MTYyMTk3NTAzMn0.cS4Zk17T7sCuUKh2uA0CNQAE3k1qquEUTlnZ9v09bpY'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')