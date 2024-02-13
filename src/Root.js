import {useEffect, useState} from 'react';
import Locale from './helpers/localization';
import en from './Language/en.json';
import ar from './Language/ar.json';
import App from './App/App';
import {Alert, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import {setUserId} from './helpers/Redux/mainReducer';

export const Root = () => {
  const [startApp, setStartApp] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserLanguage();
    getUserId();
  }, []);

  const supportRTL = () => {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    RNRestart.restart();
  };

  const getUserLanguage = async () => {
    try {
      Locale.config({en: en, ar: ar});
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        Locale.setLanguage(value);
      } else {
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

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    dispatch(setUserId(userId));
  };

  return startApp ? <App /> : <></>;
};

export default Root;
