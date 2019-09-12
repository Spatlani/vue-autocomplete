import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@fortawesome/fontawesome-free/css/all.css';

import { Validator, install as VeeValidate } from 'vee-validate/dist/vee-validate.minimal.esm';
import {
  required,
  min,
  max,
  regex,
  min_value,
  alpha_dash,
  max_value,
  confirmed,
  numeric,
} from 'vee-validate/dist/rules.esm';
import veeEn from 'vee-validate/dist/locale/en';

Vue.use(Vuetify, {
  theme: {
    primary: '#95d21d',
    backup: '#0d3146',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  options: {
    customProperties: true,
  },
  iconfont: 'fa',
});

// Add the rules you need.
Validator.extend('required', required);
Validator.extend('min', min);
Validator.extend('max', max);
Validator.extend('min_value', min_value);
Validator.extend('max_value', max_value);
Validator.extend('alpha_dash', alpha_dash);
Validator.extend('regex', regex);
Validator.extend('confirmed', confirmed);
Validator.extend('numeric', numeric);

// Merge the messages.
Validator.localize('en', veeEn);

// install the plugin
Vue.use(VeeValidate, {
  events: '',
});
