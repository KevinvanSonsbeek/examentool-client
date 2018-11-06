import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'

Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.mixin({
  data () {
    return {
        errorMessages: []
    }
  },
  methods: {
    _addErrorMessage(errorCode, message) {
      this.errorMessages.push({code: errorCode, message: message});
      console.log(this.errorMessages);
    },
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
