import { createRouter, createWebHashHistory } from 'vue-router';
import config from './config';
import { configToRoutesAndNavigation } from './utils';

const [routes, navigation, navigationMap] = configToRoutesAndNavigation(config);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router, navigation, navigationMap };
