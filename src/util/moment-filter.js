import Vue from 'vue';

export default Vue.filter('moment', function(value, format) {
  return value.format(format);
});
