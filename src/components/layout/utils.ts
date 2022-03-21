import type { RouteLocationNormalizedLoaded } from 'vue-router';

export const findNearMenuName = (route:RouteLocationNormalizedLoaded):string => {
  let _ = route;
  while (_.meta.type !== 'menu' && _.meta.parent !== null && _.meta.parent !== undefined) {
    _ = _.meta.parent as RouteLocationNormalizedLoaded;
  }
  return _.name as string;
};
