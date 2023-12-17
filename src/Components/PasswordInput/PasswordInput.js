import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import {Icons} from '../../assets/Icons';
import {getShadow} from '../../helpers/shadow';

export const PasswordInput = ({
  onValueChange,
  value,
  label,
  onBlurField,
  style,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <View style={[styles.root, getShadow('white'), style]}>
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

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  textField: {flex: 1},
  button: {marginHorizontal: 6},
});

export default PasswordInput;
