/*global EventSource */

import Vue from 'vue';
import template from './solar.html';
import Grid from '../Grid/grid.js';

import IEcharts from 'vue-echarts-v3';

import 'echarts/lib/chart/line';

import { API_BASE } from 'src/config/constants';

export default Vue.component('solar', {
  template,
  props: ['grid', 'position'],
  components: {
    Grid,
    IEcharts
  },
  data() {
    return {
      currentSolarProduction: {},
      eventSource: undefined,
      chartOptions: {
        grid: {
          top: '60%',
          bottom: 20
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
          //min: 17,
          //max: 23,
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
    this.eventSource = new EventSource(API_BASE + '/solar');
    var self = this;
    this.eventSource.onmessage = function(e) {
      var lastSolarProduction = JSON.parse(e.data);

      self.currentSolarProduction = lastSolarProduction[lastSolarProduction.length - 1];
      if (self.currentSolarProduction === undefined) {
        self.currentSolarProduction = {};
      }

      let history = [];
      let xData = [];
      lastSolarProduction.forEach(function(solarProduction) {
        history.push(solarProduction.value);
        xData.push(solarProduction.time);
      });

      self.chartOptions.series[0].data = history;
      self.chartOptions.xAxis.data = xData;
    };
  },
  destroyed() {
    this.eventSource.close();
  }
});
