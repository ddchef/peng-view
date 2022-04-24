import { defineStore } from 'pinia';
import type { Router } from 'vue-router';
import { DefRecordRaw, Navigation } from '../routes';
import { filterPermissions } from '../utils/auth';
import { getUserInfo } from './api';

export interface User {
  avatar: string,
  username: string,
  realName: string,
  email: string,
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
      avatar: '',
      username: '',
      realName: '',
      email: '',
    },
    theme: 'light',
    menuMode: 'left',
    token: '',
    indexPath: '',
  }),
  actions: {
    async getUserInfo() {
      const res = await getUserInfo<User>();
      this.user = res.data;
    },
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
      this.permissions = ['user', 'setting', 'userAdd', 'userEdit', 'role'];
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
          path: '/:pathMatch(.*)*',
          redirect: '/404',
        },
      );
      this.indexPath = defaultPath;
    },
    async fetchUserInfo() {
      // todo
    },
    async logout() {
      this.token = '';
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
