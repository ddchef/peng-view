import { defineStore } from 'pinia';
import type { Router } from 'vue-router';
import { DefRecordRaw, Navigation } from '../routes';
import { filterPermissions } from '../utils/auth';

export interface User {
  avatar: string,
  name: string,
  realName: string,
  phone: string,
}

interface Main {
  navigation: Navigation[],
  navigationMap: Map<string, Navigation>,
  permissions: string[],
  logo: string,
  title: string,
  subTitle: string,
  user: User,
  theme: 'dark'|'light',
  menuMode: 'left'|'top',
  token: string,
  indexPath: string,
}

export const useMainStore = defineStore('main', {
  state: (): Main => ({
    navigation: [],
    navigationMap: new Map(),
    permissions: [],
    logo: '/logo.png',
    title: 'PENG管理系统',
    subTitle: '',
    user: {
      avatar: 'https://rumenz.com/static/cimg/img/demo2.jpg',
      name: 'admin',
      realName: '系统管理员',
      phone: '18222222222',
    },
    theme: 'light',
    menuMode: 'left',
    token: '',
    indexPath: '',
  }),
  actions: {
    setNavigation(navigation: Navigation[]) {
      this.navigation = navigation;
    },
    setNavigationMap(navigationMap: Map<string, Navigation>) {
      this.navigationMap = navigationMap;
    },
    setToken(token:string) {
      this.token = token;
    },
    toggleTheme() {
      if (this.theme === 'dark') {
        this.theme = 'light';
        return;
      }
      this.theme = 'dark';
    },
    async fetchPermissions(_config:DefRecordRaw[], router:Router) {
      // todo
      this.permissions = ['user', 'setting', 'userAdd', 'role'];
      const [
        routes, navigation, navigationMap, defaultPath,
      ] = filterPermissions(_config, this.permissions);
      this.setNavigation(navigation);
      this.setNavigationMap(navigationMap);
      routes.forEach((route) => {
        router.addRoute(route);
      });
      router.addRoute({
        path: '/',
        redirect: defaultPath,
      });
      router.addRoute(
        {
          path: '/:catchAll(.*)',
          redirect: '/404',
        },
      );
      this.indexPath = defaultPath;
    },
    async fetchUserInfo() {
      // todo
    },
  },
  getters: {
    isAuthenticated: (state):boolean => state.token !== '',
    contentBodyColor: (state):string => (state.theme === 'dark' ? 'rgb(24 24 28)' : 'rgb(246, 246, 246)'),
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['theme', 'menuMode', 'token'],
      },
    ],
  },
});
