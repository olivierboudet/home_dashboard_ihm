import Vue from 'vue';
import VueRouter from 'vue-router';

import Navigation from 'components/Navigation/navigation';

Vue.use(VueRouter);

import 'src/config/http';
import routes from 'src/routes';
import 'src/util/moment-filter';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
  router,
  components: {
    Navigation
  },

  data(){
    return {

    };
  },

  created(){

  }
}).$mount('#app');
