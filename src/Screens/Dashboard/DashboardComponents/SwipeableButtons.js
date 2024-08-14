import {Icons} from '../../../assets/Icons';
import {handleAPIErrors, pagesNames} from '../../../helpers/utils';
import {deleteSpecificDocument} from '../utils';

import styles from '../Dashboard.styles';

import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import Button from '../../../Components/Button/Button';
import {updateDocuments} from '../../../helpers/firebase';
import {setIsLoadingOverLay} from '../../../helpers/Redux/mainReducer';

export const SwipeableButtons = ({
  onPressItem,
  refreshing,
  item,
  navigation,
}) => {
  const {userId, userData} = useSelector(state => state.main);
  const {favorite} = item.data;
  const dispatch = useDispatch();

  const convertToFavorite = async () => {
    try {
      dispatch(setIsLoadingOverLay(true));
      const FavoriteIndex = userData.findIndex(item => item?.data?.favorite);
      await updateDocuments(userId, item.id, {...item, favorite: true});
      if (FavoriteIndex !== -1) {
        const favoriteItem = userData[FavoriteIndex];
        await updateDocuments(userId, favoriteItem.id, {
          ...favoriteItem,
          favorite: false,
        });
      }
      refreshing();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      dispatch(setIsLoadingOverLay(false));
    }
  };

  const convertToUnFavorite = async () => {
    try {
      dispatch(setIsLoadingOverLay(true));
      await updateDocuments(userId, item.id, {...item, favorite: false});
      refreshing();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      dispatch(setIsLoadingOverLay(false));
    }
  };

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
      <Button
        containerStyle={[styles.button, styles.favoriteButton]}
        source={favorite ? Icons.filledStar : Icons.emptyStar}
        tintColor={'#EAB308'}
        withoutShadow
        onPress={() => {
          if (!favorite) convertToFavorite();
          else convertToUnFavorite();
        }}
      />
    </View>
  );
};

export default SwipeableButtons;
