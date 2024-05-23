import {create} from 'apisauce';
import {logger} from '../utils';

const api = create({
  baseURL: 'http://streaming.nexlesoft.com:3001',
  headers: {'Content-Type': 'application/json'},
});

api.addMonitor(response => {
  if (response.config) {
    const {method, url, data, headers, baseURL} = response.config;
    const fullUrl = `${baseURL}${url}`;
    const curl = [
      'curl',
      '-X',
      method?.toUpperCase(),
      `'${fullUrl}'`,
      ...(headers
        ? Object.entries(headers).map(([key, value]) => `-H '${key}: ${value}'`)
        : []),
      ...(data ? [`-d '${JSON.stringify(data)}'`] : []),
    ].join(' ');

    logger.log('CURL:', curl);
  }
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.setHeader('Authorization', `Bearer ${token}`);
  } else {
    api.deleteHeader('Authorization');
  }
};

export default api;
