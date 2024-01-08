import {Text as AppText, StyleSheet, Animated} from 'react-native';
import Locale from '../../helpers/localization';
import {isNil} from '../../helpers/utils';
export const Text = ({
  value,
  localeKey,
  localeProps,
  variant = 'h2',
  isGrey,
  isBlue,
  style,
}) => {
  return (
    <Animated.Text
      style={[
        styles.blackColor,
        styles[variant],
        isGrey ? styles.greyColor : null,
        isBlue ? styles.blueColor : null,
        style,
      ]}>
      {!isNil(value) ? value : Locale.t(localeKey, localeProps)}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  h2: {fontSize: 22, fontWeight: '700'},
  bodySemibold: {fontSize: 17, fontWeight: '600'},
  bodyRegular: {fontSize: 17, fontWeight: '400'},
  captionRegular: {color: '#FC5555', fontSize: 13, fontWeight: '400'},
  greyColor: {color: '#72788E'},
  blueColor: {color: '#32ADE6'},
  blackColor: {color: 'black'},
});

export default Text;
