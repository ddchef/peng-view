import request from '../../libs/request';

export function login<T, D=any>(data:D) {
  return request<T>('/public/login', { method: 'POST' }, data);
}

export function postCode<T>() {
  return request<T>('/public/captcha', { method: 'POST' });
}
