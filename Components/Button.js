import LottieView from 'lottie-react-native';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
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
      ]}
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
});

export default Button;
