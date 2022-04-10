import request from '../../libs/request';

export function register<T, D=any>(data:D) {
  return request<T>('/api/public/register', { method: 'POST' }, data);
}

export function getCode<T>() {
  return request<T>('/api/public/captcha', { method: 'GET' });
}
