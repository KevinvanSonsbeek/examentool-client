import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

Vue.use(VueResource)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')