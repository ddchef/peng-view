import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './routes';
import './assets/style/style.scss';

createApp(App).use(createPinia()).use(router).mount('#app');
