import {Text as AppText, StyleSheet, Animated} from 'react-native';
import Locale from '../../helpers/localization';
import {isNil} from '../../helpers/utils';
export const Text = ({
  value,
  localeKey,
  localeProps,
  variant = 'h2',
  color,
  style,
  numberOfLines,
  ellipsizeMode,
  textAlign,
  isLineThrough,
}) => {
  const getColor = () => {
    if (!color) return null;
    else {
      isColorExist = styles[`${color}Color`];
      if (isColorExist) return isColorExist;
      else return {color: color};
    }
  };

  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.blackColor,
        styles[variant],
        getColor(),
        styles.mainStyle,
        {textAlign: textAlign},
        isLineThrough ? {textDecorationLine: 'line-through'} : null,
        style,
      ]}>
      {!isNil(value) ? value : Locale.t(localeKey, localeProps)}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  mainStyle: {textAlign: 'left'},
  h2: {fontSize: 22, fontWeight: '700'},
  bodySemibold: {fontSize: 17, fontWeight: '600'},
  bodyRegular: {fontSize: 17, fontWeight: '400'},
  subHead: {fontSize: 15, fontWeight: '400'},
  captionRegular: {color: '#FC5555', fontSize: 13, fontWeight: '400'},
  greyColor: {color: '#72788E'},
  blueColor: {color: '#32ADE6'},
  whiteColor: {color: 'white'},
  blackColor: {color: 'black'},
});

export default Text;
