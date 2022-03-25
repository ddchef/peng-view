import type { RouteRecordRaw } from 'vue-router';
import type { DefRecordRaw, Navigation } from '../routes';

export function filterPermissions(config:DefRecordRaw[], permissions:string[]):[
  RouteRecordRaw[], Navigation[], Map<string, Navigation>, string
] {
  const layoutRoutes: RouteRecordRaw = {
    name: 'layout',
    path: '/layout',
    component: () => import('../components/layout/index.vue'),
    children: [],
  };
  const routes: RouteRecordRaw[] = [layoutRoutes];
  const navigationMap:Map<string, Navigation> = new Map();
  let defaultPath = '';
  const filterFuc = (
    _config:DefRecordRaw[],
    parentNav:Navigation|null = null,
    parentRoute:RouteRecordRaw|null = null,
  ) => _config.map((item):Navigation|null => {
    if (!permissions.includes(item.id)) return null;
    const baseNav = {
      id: item.id,
      name: item.name || item.id,
      title: item.title,
      type: item.type || 'page',
      parent: parentNav,
    };
    const baseRoute = item.type === 'group' ? null : {
      name: item.name || item.id,
      path: item.path as string,
      meta: {
        ...item.meta,
        public: item.public,
        layout: item.layout,
        parent: parentRoute,
        type: item.type,
      },
      component: () => import(`../view${item.componentPath}`),
    };
    navigationMap.set(baseNav.name, baseNav);
    const children = filterFuc(item.children || [], baseNav, baseRoute);

    // 路由处理
    if (item.type !== 'group') {
      if (!item.layout) {
        layoutRoutes.children?.push(baseRoute as RouteRecordRaw);
      }
      if (item.layout === 'full') {
        routes.push(Object.assign(baseRoute, {
          path: `/${item.path}`,
        }));
      }
    }
    // 菜单处理
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
    if (!defaultPath) {
      defaultPath = path;
    }
    if (path) {
      Object.assign(baseNav, {
        path,
      });
    }
    if (children.length > 0) {
      return Object.assign(baseNav, {
        children,
      });
    }
    return baseNav;
  }).filter((item) => item) as Navigation[];
  const navigation: Navigation[] = filterFuc(config, null, null);
  return [routes, navigation, navigationMap, defaultPath];
}
