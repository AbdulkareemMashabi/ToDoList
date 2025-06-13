import LottieView from 'lottie-react-native';
import {pagesNames, readToken} from '../../helpers/utils';
import Container from '../../Components/Contianer/Container';
import {useEffect, useState} from 'react';
import Locale from '../../helpers/localization';
import en from '../../Language/en.json';
import ar from '../../Language/ar.json';
import {Alert, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import {setToken} from '../../helpers/Redux/mainReducer';
import BootSplash from 'react-native-bootsplash';

import styles from './Lottie.style';

import {LottieIndex} from '../../assets/Lottie';

export const Lottie = ({navigation}) => {
  const [startApp, setStartApp] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const init = async () => {
      getUserLanguage();
      getToken();
    };

    init().finally(async () => {
      new Promise(resolve => {
        setTimeout(async () => {
          await BootSplash.hide({fade: true});
          resolve();
        }, 500);
      }).then(() => {
        setStartApp(true);
      });
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

  const getToken = async () => {
    const token = await readToken();
    dispatch(setToken(token));
  };

  return (
    <Container backgroundColor={'#e5e5e5'}>
      {startApp ? (
        <LottieView
          source={LottieIndex.splash}
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
