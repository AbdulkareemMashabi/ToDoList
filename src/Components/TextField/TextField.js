import {useEffect, useRef, useState} from 'react';
import {Animated, TextInput, TouchableOpacity} from 'react-native';
import Text from '../Text/Text';
import Locale from '../../helpers/localization';
import {cardShadow} from '../../helpers/shadow';

import styles from './TextField.style';

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
  const fontSizeRef = useRef(new Animated.Value(17)).current;
  const positionRef = useRef(new Animated.Value(16)).current;
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
    Animated.parallel([
      Animated.timing(fontSizeRef, {
        toValue: 15,
        duration: 600,
        useNativeDriver: false,
      }).start(),
      Animated.timing(positionRef, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    ]);
  };
  const onBlur = () => {
    if (!value)
      Animated.parallel([
        Animated.timing(fontSizeRef, {
          toValue: 17,
          duration: 600,
          useNativeDriver: false,
        }).start(),
        Animated.timing(positionRef, {
          toValue: 16,
          duration: 600,
          useNativeDriver: false,
        }).start(),
      ]);
  };
  return (
    <TouchableOpacity
      onPress={() => refsFocus.current.focus()}
      style={[
        styles.touchableOpacity,
        !withoutShadow ? cardShadow : null,
        style,
      ]}>
      <Text
        style={[styles.text, {fontSize: fontSizeRef, top: positionRef}]}
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
