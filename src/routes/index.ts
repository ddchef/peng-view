import { createRouter, createWebHashHistory } from 'vue-router';
import config from './config';
import { configToRoutesAndNavigation } from './utils';

const [routes, navigation, navigationMap] = configToRoutesAndNavigation(config);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
console.log(routes, navigation, navigationMap);
export { router, navigation, navigationMap };
