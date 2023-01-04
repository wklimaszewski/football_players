require('./bootstrap');
import Vue from 'vue'

import 'vuetify/dist/vuetify.min.css'
window.Vue = require('vue').default;


Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('players-list', require('./components/PlayersList.vue').default);

import Vuetify from 'vuetify';
Vue.use(Vuetify);

const opts = {
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
}
const app = new Vue({
    el: '#app',
    vuetify : new Vuetify(opts),
});
