import type { RouteRecordRaw } from 'vue-router';
import { DefRecordRaw, Navigation } from './config';

export function configToRoutesAndNavigation(
  config: DefRecordRaw[],
): [RouteRecordRaw[], Navigation[]] {
  const layoutRoutes: RouteRecordRaw = {
    name: 'layout',
    path: '/layout',
    component: () => import('../components/layout/index.vue'),
    children: [],
  };
  const routes: RouteRecordRaw[] = [layoutRoutes];
  let navigation: Navigation[] = [];
  function configToRoutes(_config: DefRecordRaw[]) {
    _config.forEach((item) => {
      if (item.type !== 'group') {
        if (!item.layout) {
          layoutRoutes.children?.push({
            name: item.name || item.id,
            path: item.path as string,
            meta: {
              ...item.meta,
              public: item.public,
              layout: item.layout,
            },
            component: () => import(`../view${item.componentPath}`),
          });
        }
        if (item.layout === 'full') {
          routes.push({
            name: item.name || item.id,
            path: `/${item.path}`,
            meta: {
              ...item.meta,
              public: item.public,
              layout: item.layout,
            },
            component: () => import(`../view${item.componentPath}`),
          });
        }
        if (Array.isArray(item.children)) {
          configToRoutes(item.children);
        }
      }
    });
  }
  function configToNavigation(_config: DefRecordRaw[]): Navigation[] {
    return _config.map((item): Navigation => {
      if (item.type === 'group') {
        return {
          id: item.id,
          name: item.name || item.id,
          title: item.title,
          type: item.type,
          children: configToNavigation(item.children || []),
        };
      }
      if (Array.isArray(item.children)) {
        let path = '';
        if (!item.layout) {
          path = `/layout${item.path}`;
        }
        if (item.layout === 'full') {
          path = item.path as string;
        }
        if (item.layout === 'main') {
          path = `/main${item.path}`;
        }
        return {
          id: item.id,
          name: item.name || item.id,
          path,
          title: item.title,
          type: item.type,
          children: configToNavigation(item.children),
        };
      }
      return {
        id: item.id,
        name: item.name || item.id,
        path: item.path,
        title: item.title,
        type: item.type,
      };
    });
  }
  configToRoutes(config);
  navigation = configToNavigation(config);
  return [routes, navigation];
}