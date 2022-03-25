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
  contentBodyColor: string,
  token: string
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
    contentBodyColor: 'rgb(246, 246, 246)',
    token: '',
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
        this.contentBodyColor = 'rgb(246, 246, 246)';
        return;
      }
      this.theme = 'dark';
      this.contentBodyColor = 'rgb(24 24 28)';
    },
    async fetchPermissions(_config:DefRecordRaw[], router:Router) {
      // todo
      this.permissions = ['user'];
      const [routes, navigation, navigationMap] = filterPermissions(_config, this.permissions);
      this.setNavigation(navigation);
      this.setNavigationMap(navigationMap);
      routes.forEach((route) => {
        router.addRoute(route);
      });
    },
    async fetchUserInfo() {
      // todo
    },
  },
  getters: {
    isAuthenticated: (state):boolean => state.token !== '',
  },
});
