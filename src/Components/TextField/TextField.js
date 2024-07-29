import {useEffect, useRef, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import Text from '../Text/Text';
import Locale from '../../helpers/localization';
import {cardShadow} from '../../helpers/shadow';

import styles from './TextField.style';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const TextField = ({
  onValueChange,
  getValueOnChange,
  value,
  label,
  secure,
  style,
  withoutShadow,
  onBlurField,
  multiline,
}) => {
  const fontSizeRef = useSharedValue(17);
  const positionRef = useSharedValue(16);
  const [isInFocus, setIsInFocus] = useState(false);
  const refsFocus = useRef(null);

  useEffect(() => {
    if (!value) onBlur();
    else if (!!value && !isInFocus) onFocus();
  }, [value]);

  const onFocus = async () => {
    setIsInFocus(true);
    setTimeout(() => {
      setIsInFocus(false);
    }, 600);
    fontSizeRef.value = withTiming(15, {duration: 600});
    positionRef.value = withTiming(0, {duration: 600});
  };
  const onBlur = () => {
    if (!value) {
      fontSizeRef.value = withTiming(17, {duration: 600});
      positionRef.value = withTiming(16, {duration: 600});
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeRef.value,
      top: positionRef.value,
    };
  });

  return (
    <TouchableOpacity
      onPress={() => refsFocus.current.focus()}
      style={[
        styles.touchableOpacity,
        !withoutShadow ? cardShadow : null,
        style,
      ]}>
      <Text
        isAnimated
        style={[styles.text, animatedStyles]}
        localeKey={label}
        variant="bodyRegular"
        color={'grey'}
      />
      <TextInput
        multiline={multiline}
        style={[styles.textInput, {textAlign: Locale.isRTL ? 'right' : 'left'}]}
        ref={refsFocus}
        onFocus={onFocus}
        onBlur={e => {
          onBlurField(e);
          onBlur();
        }}
        value={value}
        onChangeText={text => {
          onValueChange(text);
          getValueOnChange?.(text);
        }}
        secureTextEntry={secure}
      />
    </TouchableOpacity>
  );
};

export default TextField;
