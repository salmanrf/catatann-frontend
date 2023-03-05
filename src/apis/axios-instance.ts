import axios, {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from './url';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_URL,
  timeout: 1000 * 10,
};

let instance = axios.create({ ...axiosConfig });
let requestInterceptorManager: number;
let responseInterceptorManager: number;

export function updateAxiosInstance(config: CreateAxiosDefaults) {
  instance = axios.create({
    ...axios,
    ...config,
  });

  return instance;
}

export function addAxiosInterceptor(
  type: 'request' | 'response',
  interceptor: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | ((response: AxiosResponse<any>) => any)
) {
  if (type === 'request') {
    requestInterceptorManager = instance.interceptors.request.use(
      interceptor as (
        config: InternalAxiosRequestConfig
      ) => InternalAxiosRequestConfig
    );
  }

  if (type === 'response') {
    responseInterceptorManager = instance.interceptors.response.use(
      interceptor as (response: AxiosResponse<any>) => any
    );
  }
}

export function removeAxiosInterceptor(type: 'request' | 'response') {
  if (type === 'request') {
    instance.interceptors.request.eject(requestInterceptorManager);
  }

  if (type === 'response') {
    instance.interceptors.response.eject(responseInterceptorManager);
  }
}

export function getAxiosInstance() {
  return instance;
}
