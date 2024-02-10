import {useState} from 'react';
import {View} from 'react-native';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import {Icons} from '../../assets/Icons';
import {cardShadow} from '../../helpers/shadow';

import styles from './PasswordInput.style';

export const PasswordInput = ({
  onValueChange,
  value,
  label,
  onBlurField,
  style,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <View style={[styles.root, cardShadow, style]}>
      <TextField
        style={styles.textField}
        onValueChange={onValueChange}
        value={value}
        label={label}
        secure={isHidden}
        withoutShadow
        onBlurField={onBlurField}
      />
      <Button
        containerStyle={styles.button}
        source={isHidden ? Icons.eyeOff : Icons.eye}
        onPress={() => {
          setIsHidden(!isHidden);
        }}
      />
    </View>
  );
};

export default PasswordInput;
