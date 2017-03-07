import Vue from 'vue';

import template from './grid.html';
import { addClassModifiers } from 'src/util/helpers';

Vue.filter('grid-from-to', (value) => {
  let cssClasses = value.split(':');

  if (cssClasses.length > 0) {
    cssClasses.push(cssClasses[0]); // add default end value
    cssClasses[0] = 'from-' + cssClasses[0].toLowerCase();
    cssClasses[1] = 'to-' + cssClasses[1].toLowerCase();
  }

  return cssClasses.slice(0, 2).join(' ');
});

Vue.filter('modify-class', (value, base) => {

  if (!value) return base;

  let cssClasses = value.split(' ');
  cssClasses = cssClasses.map(cssClass => base + '--' + cssClass);
  cssClasses.unshift(base);

  return cssClasses.join(' ');
});

export default Vue.component('grid', {
  template,
  props: ['modifiers', 'position', 'grid'],

  computed: {
    gridClass() {

      const [from, to = from] = this.position.toLowerCase().split(':');

      return addClassModifiers('grid', [`from-${from}`, `to-${to}`]);
    },

    tileClass() {
      return addClassModifiers('grid__tile', this.modifiers);
    },
  },
});
