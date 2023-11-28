import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset.css'
import elementTable from '@/components/element-patch/table/index.js'
import elementDatePicker from '@/components/element-patch/date-picker/main.vue'

Vue.use(ElementUI)
Vue.use(elementTable)
Vue.component('LabelDatePicker', elementDatePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
