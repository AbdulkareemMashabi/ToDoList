import {View} from 'react-native';
import Text from '../Text/Text';
import styles from './Form.style';

export const getErrorAndHint = (touched, errors, item) => {
  const isItemHasError = touched?.[item.name] && errors?.[item.name];
  return (
    <View>
      {isItemHasError || item?.hint ? (
        <Text
          style={styles.error}
          value={isItemHasError ? errors[item.name] : null}
          color={isItemHasError ? 'red' : 'grey'}
          variant="captionRegular"
          localeKey={!isItemHasError ? item?.hint : null}
        />
      ) : null}
    </View>
  );
};
