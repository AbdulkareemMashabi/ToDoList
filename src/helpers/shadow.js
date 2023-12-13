import {Platform} from 'react-native';

export const getShadow = color => {
  if (Platform.OS === 'ios') return IOSShadow(color);
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
