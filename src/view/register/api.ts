import request from '../../libs/request';

export function register<T, D=any>(data:D) {
  return request<T>('/api/user/register', { method: 'POST' }, data);
}

export function getCode<T>() {
  return request<T>('/api/common/captcha', { method: 'GET' });
}
