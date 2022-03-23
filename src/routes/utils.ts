import type { RouteRecordRaw } from 'vue-router';
import { DefRecordRaw, Navigation } from './config';

export function configToRoutesAndNavigation(
  config: DefRecordRaw[],
): [RouteRecordRaw[], Navigation[], Map<string, Navigation>] {
  const layoutRoutes: RouteRecordRaw = {
    name: 'layout',
    path: '/layout',
    component: () => import('../components/layout/index.vue'),
    children: [],
  };
  const routes: RouteRecordRaw[] = [layoutRoutes];
  let navigation: Navigation[] = [];
  const navigationMap:Map<string, Navigation> = new Map();
  function configToRoutes(_config: DefRecordRaw[], parent: RouteRecordRaw|null = null) {
    _config.forEach((item) => {
      const base = {
        name: item.name || item.id,
        path: item.path as string,
        meta: {
          ...item.meta,
          public: item.public,
          layout: item.layout,
          parent,
        },
        component: () => import(`../view${item.componentPath}`),
      };
      if (item.type !== 'group') {
        if (!item.layout) {
          layoutRoutes.children?.push(base);
        }
        if (item.layout === 'full') {
          routes.push(Object.assign(base, {
            path: `/${item.path}`,
          }));
        }
        if (Array.isArray(item.children)) {
          configToRoutes(item.children, base);
        }
      }
      if (item.type === 'group' && Array.isArray(item.children)) {
        configToRoutes(item.children, null);
      }
    });
  }
  function configToNavigation(_config: DefRecordRaw[], parentNav:Navigation|null): Navigation[] {
    return _config.map((item): Navigation => {
      const base = {
        id: item.id,
        name: item.name || item.id,
        title: item.title,
        type: item.type,
        parent: parentNav,
      };
      navigationMap.set(base.name, base);
      if (item.type === 'group') {
        return Object.assign(base, {
          children: configToNavigation(item.children || [], base),
        });
      }
      if (Array.isArray(item.children)) {
        let path = '';
        if (!item.layout) {
          path = `/layout/${item.path}`;
        }
        if (item.layout === 'full') {
          path = item.path as string;
        }
        if (item.layout === 'main') {
          path = `/main/${item.path}`;
        }
        return Object.assign(base, {
          type: item.type || 'page',
          path,
          children: configToNavigation(item.children || [], base),
        });
      }
      return Object.assign(base, {
        path: item.path,
        type: item.type || 'page',
      });
    });
  }
  configToRoutes(config);
  navigation = configToNavigation(config, null);
  return [routes, navigation, navigationMap];
}
