import LottieView from 'lottie-react-native';
import {TouchableOpacity, Image, View, Platform, Keyboard} from 'react-native';
import Text from '../Text/Text';
import {getShadow} from '../../helpers/shadow';

import styles from './Button.style';
import {useSelector} from 'react-redux';
import Locale from '../../helpers/localization';
import {dispatch} from '../../helpers/utils';
import {setEnableShineLottie} from '../../helpers/Redux/mainReducer';

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
  enableShine,
}) => {
  const isIcon = typeof source === 'number';

  const {enableShineLottie} = useSelector(state => state.main);

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
      {enableShineLottie && enableShine ? (
        <LottieView
          source={require('../../assets/Lottie/pressLottie.json')}
          autoPlay
          loop
          onAnimationFinish={() => {
            dispatch(setEnableShineLottie(false));
          }}
          style={[!Locale.isRTL ? styles.flipRTL : null, styles.doneLottie]}
        />
      ) : null}
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.2}
        style={[
          flipRTL ? styles.flipRTL : null,
          !isIcon && variant === 'primary' ? styles.container : null,
          containerStyle,
          variant === 'primary' && disabled ? styles.disabled : null,
          variant === 'primary' && !withoutShadow
            ? getShadow(shadowColor || 'blue')
            : null,
          enableShine ? styles.buttonHeight : null,
        ]}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        onPress={!disabled ? onPress : null}>
        {contentRender()}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
