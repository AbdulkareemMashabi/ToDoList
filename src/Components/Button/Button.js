import LottieView from 'lottie-react-native';
import {TouchableOpacity, Image, View} from 'react-native';
import Text from '../Text/Text';
import {getShadow} from '../../helpers/shadow';
import {Icons} from '../../assets/Icons';

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
}) => {
  const isIcon = typeof source === 'number';

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
    else if (variant === 'addButton')
      return (
        <View style={styles.addButton}>
          <Image source={Icons.plusCircle} style={styles.plusImage} />
          <Text
            localeKey={'taskDetails.addNewTask'}
            variant="bodySemibold"
            color={'blue'}
          />
        </View>
      );
    else if (isIcon)
      return <Image source={source} style={[contentStyle, styles.imageSize]} />;
    else if (variant === 'manualDraw') return null;
    else
      return (
        <Text
          textAlign={'center'}
          color={variant === 'primary' ? 'white' : '#32ADE6'}
          variant="bodySemibold"
          style={contentStyle}
          localeKey={source}
        />
      );
  };
  return (
    <TouchableOpacity
      style={[
        !isIcon && variant === 'primary' ? styles.container : null,
        containerStyle,
        variant === 'primary' && !withoutShadow
          ? getShadow(shadowColor || 'blue')
          : null,
      ]}
      hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      onPress={onPress}>
      {contentRender()}
    </TouchableOpacity>
  );
};

export default Button;
