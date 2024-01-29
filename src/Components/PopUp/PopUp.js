import {View} from 'react-native';
import Text from '../Text/Text';
import Button from '../Button/Button';
import styles from './PopUp.style';

export const PopUp = ({navigation, route}) => {
  const {title, description, confirmButton} = route.params;

  const dismissPopUp = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text localeKey={title} textAlign={'center'} />
        <Text
          textAlign={'center'}
          localeKey={description}
          style={styles.spaceBetweenItems}
        />
        <Button
          source={'common.confirm'}
          onPress={() => {
            confirmButton?.(dismissPopUp);
          }}
          containerStyle={[styles.spaceBetweenItems, styles.redButton]}
        />
        <Button
          containerStyle={styles.spaceBetweenItems}
          source={'common.cancel'}
          onPress={() => {
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

export default PopUp;
