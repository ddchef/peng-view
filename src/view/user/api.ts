import request from '../../libs/request';

export function getUserList<T>(data:any) {
  return request<T>('/user/users', { method: 'GET' }, data);
}

export function getUser<T>(id:string) {
  return request<T>(`/user/${id}`, { method: 'GET' });
}

export function postUser<T>(data:any) {
  return request<T>('/user', { method: 'POST' }, data);
}

export function deleteUser<T>(id:string) {
  return request<T>(`/user/${id}`, { method: 'DELETE' });
}
export function putUser<T>(id:string, data:any) {
  return request<T>(`/user/${id}`, { method: 'PUT' }, data);
}

export function putUserActive<T>(id:string, data:any) {
  return request<T>(`/user/active/${id}`, { method: 'put' }, data);
}
