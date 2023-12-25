import {Alert, Image, View} from 'react-native';
import Locale from './localization';
import {Icons} from '../assets/Icons';
import Text from '../Components/Text/Text';
import Toast from 'react-native-toast-message';

export const pagesNames = {
  lottie: 'Lottie',
  dashboard: 'Dashboard',
  login: 'Login',
  register: 'Register',
  forgetPassword: 'ForgetPassword',
  createNewTask: 'createNewTask',
};

export const pagesUseWaveImage = ['Login', 'Register', 'ForgetPassword'];

const errorMessages = {
  'email-already-in-use': 'APIErrorMessages.emailUsed',
  'weak-password': 'APIErrorMessages.weakPassword',
};

export const backgroundColors = {
  blue: '#32ADE6',
  red: '#FF3B30',
  green: '#34C759',
  orange: '#FF9500',
};

export const shadowColors = {
  ...backgroundColors,
  blue: '#0387D1',
};

export const handleAPIErrors = error => {
  const message = errorMessages[error.code.split('/')[1]];
  Alert.alert(Locale.t('common.errorOccurred'), Locale.t(message));
};

export const toastConfig = {
  success: props => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#30D158',
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginHorizontal: 20,
      }}>
      <Image source={Icons.checkMark} style={{marginHorizontal: 10}} />
      <Text
        style={{color: 'white'}}
        localeKey={props.text1}
        variant="bodySemibold"
      />
    </View>
  ),
};

export const showToast = text => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: text,
  });
};
