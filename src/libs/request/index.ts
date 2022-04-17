import Axios from 'axios';
import type {
  AxiosRequestConfig, Method, AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { useMainStore } from '../../store';
import { router } from '../../routes/index';

declare interface RequestConfig{
  method: Method,
  headers?: AxiosRequestHeaders,
}
export interface MBody<D>{
  error_code: number,
  message: string,
  data:D
}
const axios = Axios.create({
  baseURL: '/api/v1',
});
async function request<T, R=MBody<T>>(url:string, config:RequestConfig, data?:any):Promise<R> {
  const store = useMainStore();
  const axiosConfig = <AxiosRequestConfig> {
    url,
    method: config.method,
    headers: { Authorization: store.token, ...config.headers || {} },
  };
  if (['GET', 'DELETE'].includes(config.method.toUpperCase())) {
    axiosConfig.params = data;
  }
  if (['PUT', 'POST'].includes(config.method.toUpperCase())) {
    axiosConfig.data = data;
  }
  const response = await axios.request<R, AxiosResponse<R>>(axiosConfig);
  if (response.status === 200) {
    // @ts-ignore
    if (response.data.error_code === 40100) {
      // @ts-ignore
      window.$message.error(response.data.message);
      router.push('/login');
      // @ts-ignore
      throw new Error(response.data.message);
    }
    // @ts-ignore
    if (response.data.error_code !== 0) {
      // @ts-ignore
      window.$message.error(response.data.message);
      // @ts-ignore
      throw new Error(response.data.message);
    }
    return response.data;
  }
  return response.data;
}
export default request;
