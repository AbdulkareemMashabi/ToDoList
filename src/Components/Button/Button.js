import LottieView from 'lottie-react-native';
import {TouchableOpacity, Image, View} from 'react-native';
import Text from '../Text/Text';
import {getShadow} from '../../helpers/shadow';

import styles from './Button.style';
import Locale from '../../helpers/localization';
import {LottieIndex} from '../../assets/Lottie';

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
  boldText,
  icon,
  flipRTL,
  tintColor,
}) => {
  const isIcon = typeof source === 'number';

  const getTextColor = () => {
    if (textColor) return textColor;
    else if (disabled) return 'grey';
    else if (variant === 'primary') return 'white';
    else return '#32ADE6';
  };

  const getImageColor = () => {
    if (disabled) return 'grey';
    else if (tintColor) return tintColor;
    else null;
  };

  const contentRender = () => {
    if (isLoading)
      return (
        <LottieView
          source={LottieIndex.loading}
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
          tintColor={getImageColor()}
        />
      );
    else if (variant === 'iconWithText')
      return (
        <View style={[styles.iconWithTextView, contentStyle]}>
          <Image source={icon} style={styles.icon} tintColor={getTextColor()} />
          <Text
            textAlign={'center'}
            variant="bodySemibold"
            localeKey={source}
            bold={boldText}
            color={getTextColor()}
          />
        </View>
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
          bold={boldText}
        />
      );
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={[
          flipRTL && Locale.isRTL ? styles.flipRTL : null,
          !isIcon && variant === 'primary' ? styles.container : null,
          containerStyle,
          variant === 'primary' && disabled ? styles.disabled : null,
          variant === 'primary' && !withoutShadow
            ? getShadow(shadowColor || 'blue')
            : null,
        ]}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        onPress={!disabled ? onPress : null}>
        {contentRender()}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
