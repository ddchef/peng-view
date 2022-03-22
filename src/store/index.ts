import { defineStore } from 'pinia';
import { Navigation } from '../routes/config';

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
  user: User
}

export const useMainStore = defineStore('main', {
  state: (): Main => ({
    navigation: [],
    navigationMap: new Map(),
    permissions: [],
    logo: '/logo.png',
    title: '碰管理系统',
    subTitle: '',
    user: {
      avatar: 'https://rumenz.com/static/cimg/img/demo2.jpg',
      name: 'admin',
      realName: '系统管理员',
      phone: '18222222222',
    },
  }),
  actions: {
    setNavigation(navigation: Navigation[]) {
      this.navigation = navigation;
    },
    setNavigationMap(navigationMap: Map<string, Navigation>) {
      this.navigationMap = navigationMap;
    },
    async fetchPermissions() {
      // todo
    },
    async fetchUserInfo() {
      // todo
    },
  },
});
