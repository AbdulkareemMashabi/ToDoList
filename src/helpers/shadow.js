import {Platform} from 'react-native';
import {shadowColors} from './utils';

export const getShadow = color => {
  const shadow = shadowColors[color];
  if (Platform.OS === 'ios') return IOSShadow(shadow);
  else return androidShadow;
};

const IOSShadow = color => ({
  shadowColor: color,
  shadowRadius: 50,
  shadowOpacity: 0.3,
  shadowOffset: {width: 0, height: 4},
});
const androidShadow = {
  elevation: 3,
};
