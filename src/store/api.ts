import request from '../libs/request';

export function getUserInfo<T>() {
  return request<T>('/user/info', { method: 'GET' });
}
