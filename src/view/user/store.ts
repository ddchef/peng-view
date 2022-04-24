import { defineStore } from 'pinia';
import { getUserList } from './api';

export interface User{
  id:string,
  username:string,
  email: string,
  active: string,
  created_at: string,
  updated_at: string,
  avatar:string
}

interface UserModule {
  list: User[],
  total: number,
  limit: number,
  page: number
}

export const useUserStore = defineStore('user', {
  state: ():UserModule => ({
    list: [],
    total: 0,
    limit: 20,
    page: 1,
  }),
  actions: {
    async getData() {
      const res = await getUserList<{total:number, list:User[]}>(
        { offset: (this.page - 1) * this.limit, limit: this.limit },
      );
      this.list = res.data.list;
      this.total = res.data.total;
    },
    setPage(page:number) {
      this.page = page;
      this.getData();
    },
    setLimit(limit:number) {
      this.limit = limit;
      this.getData();
    },
  },
});
