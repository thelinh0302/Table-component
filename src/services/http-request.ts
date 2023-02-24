import { AxiosInstance, AxiosRequestConfig } from 'axios';
import AxiosRequest from './axios-base';

class HttpRequest {
  baseRequest: AxiosInstance;
  constructor() {
    this.baseRequest = AxiosRequest;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return this.baseRequest.get(url, config);
  }

  async post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.baseRequest.post(url, data, config);
  }
}

export default new HttpRequest();
