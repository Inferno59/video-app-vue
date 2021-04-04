import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
// import { BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import store from './store';

import elements from './plugins/elements';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: App,
    },
  ],
});

app.use(elements);
// app.use(BootstrapVueIcons);
app.use(router);
app.use(store).mount('#app');
