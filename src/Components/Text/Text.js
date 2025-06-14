import Animated from 'react-native-reanimated';
import Locale from '../../helpers/localization';

import {Text as RNText} from 'react-native';

import styles from './Text.style';

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
  bold,
  isAnimated,
  flipRTL,
}) => {
  const getColor = () => {
    if (!color) return null;
    else {
      const isColorExist = styles?.[`${color}Color`];
      if (isColorExist) return isColorExist;
      else return {color: color};
    }
  };

  if (!value && !localeKey) return null;

  const TextComponent = isAnimated ? Animated.Text : RNText;

  return (
    <TextComponent
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.blackColor,
        styles[variant],
        getColor(),
        {textAlign: textAlign || 'left'},
        isLineThrough ? {textDecorationLine: 'line-through'} : null,
        style,
        bold ? styles.boldStyle : null,
        flipRTL ? styles.flipRTL : null,
      ]}>
      {value ? value : Locale.t(localeKey, localeProps)}
    </TextComponent>
  );
};

export default Text;
