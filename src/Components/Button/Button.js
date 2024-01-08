import LottieView from 'lottie-react-native';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import Text from '../Text/Text';
import {getShadow} from '../../helpers/shadow';
import {Icons} from '../../assets/Icons';

export const Button = ({
  source,
  containerStyle,
  contentStyle,
  onPress,
  isLoading,
  variant = 'primary',
  shadowColor,
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
            isBlue
          />
        </View>
      );
    else if (isIcon)
      return (
        <Image source={source} style={[containerStyle, styles.imageSize]} />
      );
    else
      return (
        <Text
          variant="bodySemibold"
          style={[
            contentStyle,
            styles.text,
            variant === 'primary' ? styles.whiteText : styles.blueText,
          ]}
          localeKey={source}
        />
      );
  };
  return (
    <TouchableOpacity
      style={[
        !isIcon && variant === 'primary' ? styles.container : null,
        containerStyle,
        variant === 'primary' ? getShadow(shadowColor || 'blue') : null,
      ]}
      hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      onPress={onPress}>
      {contentRender()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageSize: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  loading: {width: '100%', height: 30},
  text: {
    textAlign: 'center',
  },
  blueText: {color: '#32ADE6'},
  whiteText: {color: 'white'},
  container: {
    width: '100%',
    height: 48,
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusImage: {
    marginRight: 16,
  },
});

export default Button;
