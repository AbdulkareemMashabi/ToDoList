import LottieView from 'lottie-react-native';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Text from './Text';

export const Button = ({
  source,
  containerStyle,
  contentStyle,
  onPress,
  isLoading,
  variant = 'primary',
}) => {
  const isIcon = typeof source === 'number';
  const operationSystem = Platform.OS;

  const shadow = () => {
    if (operationSystem === 'ios') return styles.IOSShadow;
    else return styles.androidShadow;
  };

  const contentRender = () => {
    if (isLoading)
      return (
        <LottieView
          source={require('../assets/Lottie/loading.json')}
          autoPlay
          loop
          style={styles.loading}
        />
      );
    else if (isIcon)
      return (
        <ImageBackground
          source={source}
          style={[containerStyle, styles.imageSize]}
        />
      );
    else
      return (
        <Text
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
        variant === 'primary' ? shadow() : null,
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
  loading: {flex: 1},
  text: {
    fontSize: 17,
    fontWeight: 600,
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
  IOSShadow: {
    shadowColor: '#0387D1',
    shadowRadius: 50,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 4},
  },
  androidShadow: {
    elevation: 3,
  },
});

export default Button;
