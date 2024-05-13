import LottieView from 'lottie-react-native';
import {pagesNames} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import {useEffect, useState} from 'react';
import Locale from '../../helpers/localization';
import en from '../../Language/en.json';
import ar from '../../Language/ar.json';
import {Alert, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../helpers/Redux/mainReducer';
import BootSplash from 'react-native-bootsplash';

import styles from './Lottie.style';

export const Lottie = ({navigation}) => {
  const [startApp, setStartApp] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      getUserLanguage();
      getUserId();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      setStartApp(true);
    });
  }, []);

  const initialRTL = () => {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    setTimeout(() => {
      RNRestart.restart();
    }, 300);
  };

  const getUserLanguage = async () => {
    try {
      Locale.config({en: en, ar: ar});
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        Locale.setLanguage(value);
      } else {
        await AsyncStorage.setItem('language', 'ar');
        initialRTL();
      }
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

  return (
    <Container backgroundColor={'#e5e5e5'}>
      {startApp ? (
        <LottieView
          source={require('../../assets/Lottie/splash.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.replace(pagesNames.dashboard)}
          style={styles.lottie}
        />
      ) : null}
    </Container>
  );
};

export default Lottie;
