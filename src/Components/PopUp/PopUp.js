import {View} from 'react-native';
import Text from '../Text/Text';
import Button from '../Button/Button';
import styles from './PopUp.style';
import Container from '../Contianer/Container';

export const PopUp = ({navigation, route}) => {
  const {title, description, confirmButton, withoutCancel, firstButtonTitle} =
    route.params;

  const dismissPopUp = () => {
    navigation.goBack();
  };

  return (
    <Container style={styles.container} noPadding>
      <View style={styles.modal}>
        <Text localeKey={title} textAlign={'center'} />

        <Text
          textAlign={'center'}
          localeKey={description}
          style={styles.spaceBetweenItems}
        />
        <Button
          source={firstButtonTitle || 'common.confirm'}
          onPress={() => {
            confirmButton?.(dismissPopUp) || dismissPopUp();
          }}
          containerStyle={[styles.spaceBetweenItems, styles.redButton]}
        />
        {!withoutCancel ? (
          <Button
            containerStyle={styles.spaceBetweenItems}
            source={'common.cancel'}
            onPress={() => {
              navigation.pop();
            }}
          />
        ) : null}
      </View>
    </Container>
  );
};

export default PopUp;
