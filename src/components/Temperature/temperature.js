/*global EventSource */

import Vue from 'vue';
import template from './temperature.html';
import Grid from '../Grid/grid.js';
import IEcharts from 'vue-echarts-v3';

import 'echarts/lib/chart/line';

import { API_BASE } from 'src/config/constants';

export default Vue.component('temperature', {
  template,
  props: ['grid', 'position', 'room', 'min', 'max', 'threshold'],
  components: {
    Grid,
    IEcharts
  },
  data() {
    return {
      currentTemperature: '',
      eventSource: undefined,
      chartOptions: {
        grid: {
          top: '60%',
          left: 25,
          bottom: 40
        },
        series: [
          {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [],
            animationDuration: 1000,
            color: '#fff',
            smooth: true,
            clickable: false
          }
        ],
        xAxis: {
          type: 'category',
          show: false,
          data: [],
        },
        yAxis: {
          show: true,
          min: this.min,
          max: this.max,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        animationDuration: 2000
      }
    };
  },
  created() {
    this.eventSource = new EventSource(API_BASE + '/temperature?room=' + this.room);
    var self = this;
    this.eventSource.onmessage = function(e) {
      var lastTemperatures = JSON.parse(e.data);

      self.currentTemperature = lastTemperatures[lastTemperatures.length - 1];

      let history = [];
      let xData = [];
      lastTemperatures.forEach(function(temperature) {
        history.push(temperature.value);
        xData.push(temperature.time);
      });

      self.chartOptions.series[0].data = history;
      self.chartOptions.xAxis.data = xData;
    };
  },
  destroyed() {
    this.eventSource.close();
  }
});
