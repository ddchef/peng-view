import request from '../../libs/request';

export function login<T, D=any>(data:D) {
  return request<T>('/api/public/login', { method: 'POST' }, data);
}

export function getCode<T>() {
  return request<T>('/api/public/captcha', { method: 'GET' });
}
