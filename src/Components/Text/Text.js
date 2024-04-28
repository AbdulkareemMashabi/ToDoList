import {Animated} from 'react-native';
import Locale from '../../helpers/localization';
import {isNil} from '../../helpers/utils';

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

  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.blackColor,
        styles[variant],
        getColor(),
        {textAlign: textAlign || 'left'},
        isLineThrough ? {textDecorationLine: 'line-through'} : null,
        style,
      ]}>
      {!isNil(value) ? value : Locale.t(localeKey, localeProps)}
    </Animated.Text>
  );
};

export default Text;
