import request from '../../libs/request';

export function register<T, D=any>(data:D):Promise<T> {
  return request('/api/user/register', { method: 'POST' }, data);
}
