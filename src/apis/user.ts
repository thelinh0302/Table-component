import { AxiosResponse } from 'axios';
import httpRequest from '@/services/http-request';

export const getUsersList = async (): Promise<AxiosResponse> =>
  httpRequest.get('https://jsonplaceholder.typicode.com/users');
