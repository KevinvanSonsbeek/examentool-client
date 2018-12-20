import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import StatusMessageMixin from './mixins/StatusMessages'
import ServerUrlMixin from './mixins/ServerUrl'
import jQuery from 'jquery'
import jQueryUi from 'jquery-ui'

global.jQuery = jQuery;
global.jQuery.extend(jQueryUi);
global.$ = jQuery;

Vue.use(VueResource);
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.mixin(StatusMessageMixin);
Vue.mixin(ServerUrlMixin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
