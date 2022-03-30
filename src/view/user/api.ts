import request from '../../libs/request';

export function getUserList<T, D=any>() {
  return request<T>('/api/auth/users', { method: 'GET' });
}
