import {View} from 'react-native';
import Text from '../Text/Text';
import styles from './Form.style';

export const getErrorAndHint = (touched, errors, item) => {
  return (
    <View>
      {touched?.[item.name] && errors?.[item.name] ? (
        <Text
          style={styles.error}
          value={errors[item.name]}
          variant="captionRegular"
        />
      ) : null}
      {(!touched?.[item.name] || !errors?.[item.name]) && item?.hint ? (
        <Text localeKey={item.hint} variant="captionRegular" isGrey />
      ) : null}
    </View>
  );
};
