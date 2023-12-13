import {useEffect, useState} from 'react';
import Locale from './helpers/localization';
import en from './Language/en.json';
import ar from './Language/ar.json';
import App from './App';
import {Alert, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

export const Root = () => {
  const [startApp, setStartApp] = useState(false);
  useEffect(() => {
    getUserLanguage();
  }, []);

  const supportRTL = () => {
    I18nManager.forceRTL(true);
    RNRestart.restart();
  };

  const getUserLanguage = async () => {
    try {
      Locale.config({en: en, ar: ar});
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        Locale.setLanguage(value);
      } else {
        Locale.setLanguage('ar');
        await AsyncStorage.setItem('language', 'ar');
        supportRTL();
      }
      setStartApp(true);
    } catch (e) {
      Alert.alert(
        Locale.t('common.errorOccurred'),
        Locale.t('myWishesPage.languageErrorChange'),
      );
    }
  };

  return startApp ? <App /> : <></>;
};

export default Root;