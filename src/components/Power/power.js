/*global EventSource */

import Vue from 'vue';
import template from './power.html';
import Grid from '../Grid/grid.js';

import IEcharts from 'vue-echarts-v3';

import 'echarts/lib/chart/line';

import { API_BASE } from 'src/config/constants';

export default Vue.component('power', {
  template,
  props: ['grid', 'position'],
  components: {
    Grid,
    IEcharts
  },
  data() {
    return {
      currentPower: '',
      eventSource: undefined,
      chartOptions: {
        grid: {
          top: '60%',
          bottom: 20,
          left: 40,
        },
        series: [
          {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: [],
            animationDuration: 1000,
            color: '#fff',
            dataFilter: 'max',
            smooth: true
          }
        ],
        xAxis: {
          type: 'category',
          show: false,
          data: [],
        },
        yAxis: {
          show: true,
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
    this.eventSource = new EventSource(API_BASE + '/power');
    var self = this;
    this.eventSource.onmessage = function(e) {
      var lastPower = JSON.parse(e.data);

      self.currentPower = lastPower[lastPower.length - 1];

      let history = [];
      let xData = [];
      lastPower.forEach(function(power) {
        history.push(power.value);
        xData.push(power.time);
      });

      self.chartOptions.series[0].data = history;
      self.chartOptions.xAxis.data = xData;
    };
  },
  destroyed() {
    this.eventSource.close();
  }
});
