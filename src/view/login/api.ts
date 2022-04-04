import request from '../../libs/request';

export function login<T, D=any>(data:D) {
  return request<T>('/api/auth/login', { method: 'POST' }, data);
}

export function getCode<T>() {
  return request<T>('/api/common/captcha', { method: 'GET' });
}
