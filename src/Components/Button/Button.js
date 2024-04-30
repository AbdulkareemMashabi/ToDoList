import LottieView from 'lottie-react-native';
import {TouchableOpacity, Image, View, Platform, Keyboard} from 'react-native';
import Text from '../Text/Text';
import {getShadow} from '../../helpers/shadow';

import styles from './Button.style';

export const Button = ({
  source,
  containerStyle,
  contentStyle,
  onPress,
  isLoading,
  variant = 'primary',
  shadowColor,
  withoutShadow,
  textColor,
  disabled,
  containerColor,
  withoutKeyBoardDismes,
}) => {
  const isIcon = typeof source === 'number';

  const _onPress = () => {
    if (Platform.OS === 'ios' || withoutKeyBoardDismes) onPress();
    else if (!withoutKeyBoardDismes) {
      Keyboard.dismiss();
      setTimeout(() => {
        onPress();
      }, 50);
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    else if (disabled) return 'grey';
    else if (variant === 'primary') return 'white';
    else return '#32ADE6';
  };

  const contentRender = () => {
    if (isLoading)
      return (
        <LottieView
          source={require('../../assets/Lottie/loading.json')}
          autoPlay
          loop
          style={styles.loading}
        />
      );
    else if (isIcon)
      return (
        <Image
          source={source}
          style={[contentStyle, styles.imageSize]}
          tintColor={disabled ? 'grey' : null}
        />
      );
    else if (variant === 'manualDraw') return null;
    else
      return (
        <Text
          textAlign={'center'}
          color={getTextColor()}
          variant="bodySemibold"
          style={contentStyle}
          localeKey={source}
        />
      );
  };
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.2}
      style={[
        !isIcon && variant === 'primary' ? styles.container : null,
        containerStyle,
        variant === 'primary' && disabled ? styles.disabled : null,
        variant === 'primary' && !withoutShadow
          ? getShadow(shadowColor || containerColor || 'blue')
          : null,
        containerColor ? {backgroundColor: containerColor} : null,
      ]}
      hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      onPress={!disabled ? _onPress : null}>
      {contentRender()}
    </TouchableOpacity>
  );
};

export default Button;
