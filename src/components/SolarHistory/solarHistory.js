/*global EventSource */

import Vue from 'vue';
import template from './solarHistory.html';

import Grid from '../Grid/grid.js';
import IEcharts from 'vue-echarts-v3';
import 'echarts/lib/chart/line';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';

import { API_BASE } from 'src/config/constants';

export default Vue.extend({
  template,

  props: ['grid'],

  components: {
    Grid,
    IEcharts
  },
  data() {
    return {
      eventSource: undefined,
      chartOptions: {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%'];
          }
        },
        dataZoom: [
          {
            start: 0,
            end: 100,
            handleStyle: {
              shadowBlur: 3,
              shadowColor: 'rgba(255, 255, 255)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }
        ],
        series: [
          {
            name: 'production',
            type: 'line',
            data: [],
            animationDuration: 1000,
            clickable: false,
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(94, 187, 174, 0.7)'
              }
            },
            areaStyle: {
              normal: {
                color: new LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(57,130,53)'
                }, {
                  offset: 1,
                  color: 'rgb(201,222,150)'
                }])
              }
            }
          }
        ],
        xAxis: {
          type: 'category',
          show: true,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          show: true,
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
    this.eventSource = new EventSource(API_BASE + '/solar_history_monthly');
    var self = this;
    this.eventSource.onmessage = function(e) {
      var solarValues = JSON.parse(e.data);

      let history = [];
      let xData = [];
      solarValues.forEach(function(value) {
        history.push(value.value);
        xData.push(value.time.substr(0, 10));
      });

      self.chartOptions.series[0].data = history;
      self.chartOptions.xAxis.data = xData;
    };
  },
  destroyed() {
    this.eventSource.close();
  }
});
