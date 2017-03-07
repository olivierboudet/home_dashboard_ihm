/*global EventSource */

import Vue from 'vue';
import template from './humidity.html';
import Grid from '../Grid/grid.js';

import { API_BASE } from 'src/config/constants';

export default Vue.component('humidity', {
  template,
  props: ['grid', 'position', 'room'],
  components: {
    Grid,
  },
  data() {
    return {
      currentHumidity: '',
      eventSource: undefined
    };
  },
  created() {
    this.eventSource = new EventSource(API_BASE + '/humidity?room=' + this.room);
    var self = this;
    this.eventSource.onmessage = function(e) {
      var humidity = JSON.parse(e.data);

      self.currentHumidity = humidity;
    };
  },
  destroyed() {
    this.eventSource.close();
  }
});
