import {Platform} from 'react-native';
import {shadowColors} from './utils';

export const getShadow = color => {
  const shadow = shadowColors[color];
  if (Platform.OS === 'ios') return IOSShadow(shadow);
  else return androidShadow;
};

export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#272424',
    shadowRadius: 25,
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 4},
  },
  android: {
    elevation: 3,
  },
});

const IOSShadow = color => ({
  shadowColor: color,
  shadowRadius: 25,
  shadowOpacity: 0.08,
  shadowOffset: {width: 0, height: 4},
});
const androidShadow = {
  elevation: 3,
};
