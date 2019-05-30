import AsyncStorage from '@react-native-community/async-storage';

const THEME_TAG = 'theme_key';
export default class ThemeService {
    getTheme = () => {

    }

    saveTheme = (theme) => {
        AsyncStorage.setItem(THEME_TAG, theme, (err) => {
            console.log(err);
        })
    }
}