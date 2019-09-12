import Vue from 'vue';
import bugsnag from '@bugsnag/js';
import bugsnagVue from '@bugsnag/plugin-vue';

if (window.location.hostname !== 'localhost') {
  const bugsnagClient = bugsnag(process.env.VUE_APP_BUGSNAG);
  bugsnagClient.use(bugsnagVue, Vue);
}
