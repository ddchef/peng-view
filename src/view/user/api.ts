import request from '../../libs/request';

export function getUserList<T, D=any>(data:D) {
  return request<T>('/api/user/users', { method: 'GET' }, data);
}
