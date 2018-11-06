import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'
import StatusMessageMixin from './mixins/StatusMessages'

Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.mixin(StatusMessageMixin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
