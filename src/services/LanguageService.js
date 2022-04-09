import AsyncStorage from '@react-native-community/async-storage';
import langsData from '../api/langs';
import keysData from '../api/keys';

export const TYPE_LANGUAGE = {
  FLAG_LANGUAGE: 'language_flag',
  FLAG_KEY: 'language_key',
};

export default class LanguageService {
  constructor(flag) {
    this.flag = flag;
  }

  fetchData = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          const data =
            this.flag === TYPE_LANGUAGE.FLAG_LANGUAGE ? langsData : keysData;
          this.saveData(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  };

  saveData = (data, callback) => {
    const stringData = JSON.stringify(data);
    AsyncStorage.setItem(this.flag, stringData, (error, result) => {
      if (!error) {
        callback && callback();
      }
    });
  };
}
