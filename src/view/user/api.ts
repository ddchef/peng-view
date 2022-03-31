import request from '../../libs/request';

export function getUserList<T, D=any>(data:D) {
  return request<T>('/api/auth/users', { method: 'GET' }, data);
}
