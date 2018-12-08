import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import StatusMessageMixin from './mixins/StatusMessages'
import ServerUrlMixin from './mixins/ServerUrl'
import jQuery from 'jquery'

global.jQuery = jQuery;
global .$ = jQuery;

Vue.use(VueResource);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.mixin(StatusMessageMixin);
Vue.mixin(ServerUrlMixin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
