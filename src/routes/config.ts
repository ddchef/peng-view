import { DefRecordRaw } from '.';

export default <DefRecordRaw[]>[
  {
    id: 'user',
    path: 'user',
    title: '用户管理',
    componentPath: '/user/index.vue',
    type: 'menu',
    children: [
      {
        id: 'userAdd',
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
  {
    id: 'setting',
    path: 'setting',
    title: '系统设置',
    componentPath: '/setting/index.vue',
    type: 'menu',
  },
];
