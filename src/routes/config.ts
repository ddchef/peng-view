import type { RouteMeta } from 'vue-router';

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

export default <DefRecordRaw[]>[
  {
    id: 'login',
    path: 'login',
    title: '登录',
    componentPath: '/login/index.vue',
    public: true,
    layout: 'full',
  },
  {
    id: 'user',
    path: 'user',
    title: '用户管理',
    componentPath: '/user/index.vue',
    type: 'menu',
    children: [
      {
        name: 'userAdd',
        path: 'user/add',
        title: '新增用户',
        componentPath: '/user/add.vue',
        type: 'page',
      },
    ],
  },
  {
    id: 'role',
    path: 'role',
    title: '角色管理',
    componentPath: '/role/index.vue',
    type: 'menu',
    children: [
      {
        name: 'roleAdd',
        path: 'role/add',
        title: '新增角色',
        componentPath: '/role/add.vue',
        type: 'page',
      },
    ],
  },
];
