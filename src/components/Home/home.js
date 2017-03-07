import Vue from 'vue';
import template from './home.html';

import Temperature from '../Temperature/temperature.js';
import CurrentTime from '../CurrentTime/currentTime.js';
import Humidity from '../Humidity/humidity.js';
import Solar from '../Solar/solar.js';
import Power from '../Power/power.js';

export default Vue.extend({
  template,

  props: ['grid'],

  components: {
    Temperature,
    CurrentTime,
    Humidity,
    Solar,
    Power
  }
});
