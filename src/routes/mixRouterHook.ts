import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useMainStore } from '../store';
import config from './config';

export default function mixRouterHook(router:Router):Router {
  router.beforeEach((
    to:RouteLocationNormalized,
    from:RouteLocationNormalized,
    next:NavigationGuardNext,
  ) => {
    const store = useMainStore();
    if (!store.isAuthenticated && to.name !== 'login') next({ name: 'login' });
    if (store.isAuthenticated && store.permissions.length === 0) {
      store.fetchPermissions(config, router).then(() => {
        next({ ...to, replace: true });
      });
    } else next();
  });
  return router;
}
