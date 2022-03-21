import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router, navigation } from './routes';
import { useMainStore } from './store';
import './assets/style/style.scss';

createApp(App).use(createPinia()).use(router).mount('#app');
const store = useMainStore();
store.setNavigation(navigation);
