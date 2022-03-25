import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteMeta } from 'vue-router';
import mixRouterHook from './mixRouterHook';

type RecordRawType = 'group' | 'menu' | 'page'
type LayoutType = 'full' | 'main' | 'layout'
export interface DefRecordRaw {
  id: string,
  name?: string,
  title: string,
  type: RecordRawType,
  path?: string,
  componentPath?: string,
  meta?: RouteMeta,
  public?: boolean,
  layout?: LayoutType,
  children?: DefRecordRaw[]
}

export interface Navigation {
  id: string,
  name: string,
  title: string,
  type: RecordRawType,
  path?: string,
  href?: string,
  parent: Navigation|null,
  children?: Navigation[]
}

export const router = mixRouterHook(
  createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        name: 'login',
        path: '/login',
        component: () => import('../view/login/index.vue'),
        meta: {
          public: true,
        },
      },
      {
        name: '404',
        path: '/404',
        component: () => import('../view/404/index.vue'),
        meta: {
          public: true,
        },
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/404',
      },
    ],
  }),
);
