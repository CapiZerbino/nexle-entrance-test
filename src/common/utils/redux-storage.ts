import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
export const localStorage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    localStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = localStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    localStorage.delete(key);
    return Promise.resolve();
  },
};
