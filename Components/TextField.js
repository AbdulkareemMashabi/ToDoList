import {useEffect, useRef} from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Text from './Text';
import Locale from '../helpers/localization';
import {getShadow} from '../helpers/shadow';

export const TextField = ({
  onValueChange,
  value,
  label,
  secure,
  style,
  withoutShadow,
  onBlurField,
}) => {
  const fontSizeRef = useRef(new Animated.Value(17)).current;
  const positionRef = useRef(new Animated.Value(16)).current;
  const refsFocus = useRef(null);

  useEffect(() => {
    if (value) onFocus();
  }, [value]);

  const onFocus = () => {
    Animated.parallel([
      Animated.timing(fontSizeRef, {
        toValue: 15,
        duration: 400,
        useNativeDriver: false,
      }).start(),
      Animated.timing(positionRef, {
        toValue: 2,
        duration: 400,
        useNativeDriver: false,
      }).start(),
    ]);
  };
  const onBlur = () => {
    if (!value)
      Animated.parallel([
        Animated.timing(fontSizeRef, {
          toValue: 17,
          duration: 400,
          useNativeDriver: false,
        }).start(),
        Animated.timing(positionRef, {
          toValue: 16,
          duration: 400,
          useNativeDriver: false,
        }).start(),
      ]);
  };
  return (
    <TouchableOpacity
      onPress={() => refsFocus.current.focus()}
      style={[
        styles.touchableOpacity,
        !withoutShadow ? getShadow('white') : null,
        style,
      ]}>
      <Text
        style={[styles.text, {fontSize: fontSizeRef, top: positionRef}]}
        localeKey={label}
        variant="bodyRegular"
        secure={secure}
      />
      <TextInput
        style={[styles.textInput, {textAlign: Locale.isRTL ? 'right' : 'left'}]}
        ref={refsFocus}
        onFocus={onFocus}
        onBlur={e => {
          onBlur();
          onBlurField(e);
        }}
        value={value}
        onChangeText={onValueChange}
        secureTextEntry={secure}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    zIndex: 1,
    left: 16,
    position: 'absolute',
  },
  textInput: {
    width: '100%',
    height: 46,
    color: 'black',
  },
  touchableOpacity: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 16,
  },
});

export default TextField;
