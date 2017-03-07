import Vue from 'vue';
import template from './currentTime.html';
import Grid from '../Grid/grid.js';
import moment from 'moment';

export default Vue.component('currentTime', {
  template,
  props: ['grid', 'position'],
  components: {
    Grid,
  },
  data() {
    return {
      now: moment()
    };
  },
  created() {
    window.setInterval(() => {
      this.now = moment();
    }, 1000);
  }
});
