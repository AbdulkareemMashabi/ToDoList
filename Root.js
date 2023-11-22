import {useEffect} from 'react';
import Locale from './helpers/localization';
import en from './Language/en.json';
import ar from './Language/ar.json';
import App from './App';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Root = () => {
  useEffect(() => {
    getUserLanguage();
  }, []);

  const getUserLanguage = async () => {
    try {
      Locale.config({en: en, ar: ar});
      const value = await AsyncStorage.getItem('language');
      if (value !== null) Locale.setLanguage(value);
      else Locale.setLanguage('ar');
    } catch (e) {
      Alert.alert(
        Locale.t('common.errorOccurred'),
        Locale.t('myWishesPage.languageErrorChange'),
      );
    }
  };

  return <App />;
};

export default Root;
