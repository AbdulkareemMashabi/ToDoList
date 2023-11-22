import {Text as AppText, StyleSheet, Animated} from 'react-native';
import Locale from '../helpers/localization';
export const Text = ({
  value,
  localeKey,
  localeProps,
  variant = 'h2',
  isGrey,
  style,
  secure,
}) => {
  return (
    <Animated.Text
      style={[styles[variant], isGrey ? styles.greyColor : null, style]}>
      {value ? value : Locale.t(localeKey, localeProps)}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  h2: {color: 'black', fontSize: 22, fontWeight: 700},
  bodySemibold: {color: 'black', fontSize: 17, fontWeight: 600},
  bodyRegular: {fontSize: 17, fontWeight: 400},
  captionRegular: {color: '#FC5555', fontSize: 13, fontWeight: 400},
  greyColor: {color: '#72788E'},
});

export default Text;
