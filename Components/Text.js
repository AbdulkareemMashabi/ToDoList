import {Text as AppText, StyleSheet} from 'react-native';
import Locale from '../helpers/localization';
export const Text = ({
  value,
  localeKey,
  localeProps,
  variant = 'h2',
  isGrey,
  style,
}) => {
  return (
    <AppText style={[styles[variant], isGrey ? styles.greyColor : null, style]}>
      {value ? value : Locale.t(localeKey, localeProps)}
    </AppText>
  );
};

const styles = StyleSheet.create({
  h2: {color: 'black', fontSize: 22, fontWeight: 700},
  body: {color: 'black', fontSize: 17, fontWeight: 600},
  greyColor: {color: '#72788E'},
});

export default Text;
