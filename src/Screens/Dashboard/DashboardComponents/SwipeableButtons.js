import {Icons} from '../../../assets/Icons';
import {pagesNames} from '../../../helpers/utils';
import {deleteSpecificDocument} from '../utils';

import styles from '../Dashboard.styles';

import {useSelector} from 'react-redux';
import {View} from 'react-native';
import Button from '../../../Components/Button/Button';

export const SwipeableButtons = ({
  onPressItem,
  refreshing,
  item,
  navigation,
}) => {
  const {userId} = useSelector(state => state.main);

  return (
    <View style={styles.buttonsTaskContainer}>
      <Button
        containerStyle={[styles.button, styles.infoButton]}
        source={Icons.info}
        withoutShadow
        onPress={() => {
          onPressItem(item.id);
        }}
      />
      <Button
        containerStyle={[styles.button, styles.deleteButton]}
        source={Icons.trash}
        withoutShadow
        onPress={() => {
          navigation.navigate(pagesNames.popUp, {
            title: 'myWishesPage.deletePopUpTitle',
            description: 'myWishesPage.deletePopUpDescription',
            confirmButton: () => {
              deleteSpecificDocument(userId, item, refreshing);
            },
          });
        }}
      />
    </View>
  );
};

export default SwipeableButtons;
