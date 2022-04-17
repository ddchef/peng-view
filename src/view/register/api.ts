import request from '../../libs/request';

export function register<T, D=any>(data:D) {
  return request<T>('/public/register', { method: 'POST' }, data);
}

export function postCode<T>() {
  return request<T>('/public/captcha', { method: 'POST' });
}
