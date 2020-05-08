import AsyncStorage from '@react-native-community/async-storage';
import {Palette} from '../api/themes';

const THEME_TAG = 'theme_key';

export default class ThemeService {
  getTheme = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(THEME_TAG, (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          this.saveTheme(Palette.Blue['400']);
          result = Palette.Blue['400'];
        }
        resolve(result);
      });
    });
  };

  saveTheme = (theme, callback) => {
    AsyncStorage.setItem(THEME_TAG, theme, (err) => {
      console.log(err);
      if (!err) {
        callback && callback();
      }
    });
  };
}
