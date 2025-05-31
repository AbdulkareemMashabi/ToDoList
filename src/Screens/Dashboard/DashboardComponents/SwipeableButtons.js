import {Icons} from '../../../assets/Icons';
import {
  handleAPIErrors,
  pagesNames,
  setSharedData,
  showToast,
} from '../../../helpers/utils';

import styles from '../Dashboard.styles';

import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import Button from '../../../Components/Button/Button';
import {setIsLoadingOverLay} from '../../../helpers/Redux/mainReducer';
import {deleteTaskService, updateFavorite} from '../../../helpers/taskServices';
import RNCalendarEvents from 'react-native-calendar-events';

export const SwipeableButtons = ({
  onPressItem,
  refreshing,
  item,
  navigation,
}) => {
  const {favorite, _id} = item || {};
  const dispatch = useDispatch();

  const handleFavoriteData = async newFavorite => {
    try {
      dispatch(setIsLoadingOverLay(true));
      await updateFavorite(_id, navigation);
      setSharedData(newFavorite ? item : undefined);
      refreshing();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      dispatch(setIsLoadingOverLay(false));
    }
  };

  const deleteTask = async () => {
    try {
      dispatch(setIsLoadingOverLay(true));
      await deleteTaskService(_id, navigation);
      const calendarId = item?.calendarId;
      if (calendarId) {
        await RNCalendarEvents.removeEvent(calendarId);
      }
      showToast('myWishesPage.TaskDeletedSuccessfully');
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
          onPressItem(item);
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
              deleteTask();
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
          handleFavoriteData(!favorite);
        }}
      />
    </View>
  );
};

export default SwipeableButtons;
