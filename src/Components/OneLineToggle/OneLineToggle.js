import {Switch, View} from 'react-native';
import Text from '../Text/Text';

import styles from './OneLineToggle.styles';
import {backgroundColors} from '../../helpers/utils';

export const OneLineToggle = ({
  onValueChange,
  leftText,
  value,
  disabled,
  style,
  onColor,
}) => {
  return (
    <View style={[styles.view, disabled ? styles.disabled : null, style]}>
      <Text
        localeKey={leftText}
        variant="bodyRegular"
        color={disabled ? 'grey' : null}
      />
      <Switch
        trackColor={{true: onColor || backgroundColors.green, false: 'grey'}}
        color
        disabled={!!disabled}
        value={!!value}
        onValueChange={v => {
          onValueChange(v);
        }}
      />
    </View>
  );
};

export default OneLineToggle;
