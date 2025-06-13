import {Icons} from '../../../assets/Icons';
import {
  handleAPIErrors,
  hideLoader,
  navigate,
  pagesNames,
  setSharedData,
  showLoader,
  showToast,
} from '../../../helpers/utils';

import styles from '../Dashboard.styles';

import {View} from 'react-native';
import Button from '../../../Components/Button/Button';
import {deleteTaskService, updateFavorite} from '../../../helpers/taskServices';
import RNCalendarEvents from 'react-native-calendar-events';
import {getUserData} from '../utils';

export const SwipeableButtons = ({onPressItem, item}) => {
  const {favorite, _id} = item || {};

  const handleFavoriteData = async newFavorite => {
    try {
      showLoader();
      await updateFavorite(_id);
      setSharedData(newFavorite ? item : undefined);
      getUserData();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      hideLoader();
    }
  };

  const deleteTask = async () => {
    try {
      showLoader();
      await deleteTaskService(_id);
      const calendarId = item?.calendarId;
      if (calendarId) {
        await RNCalendarEvents.removeEvent(calendarId);
      }
      showToast('myWishesPage.TaskDeletedSuccessfully');
      getUserData();
    } catch (e) {
      handleAPIErrors(e);
    } finally {
      hideLoader();
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
          navigate(pagesNames.popUp, {
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
