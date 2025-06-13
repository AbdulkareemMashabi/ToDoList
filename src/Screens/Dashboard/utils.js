import {Alert, I18nManager, View} from 'react-native';
import Locale from '../../helpers/localization';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {
  handleAPIErrors,
  hideLoader,
  navigate,
  pagesNames,
  setSharedData,
  showLoader,
  showToast,
  storeToken,
} from '../../helpers/utils';
import styles from './Dashboard.styles';
import {deleteDocument} from '../../helpers/firebase';
import {setUserData} from '../../helpers/Redux/mainReducer';
import {store} from '../../helpers/Redux/store';
import RNCalendarEvents from 'react-native-calendar-events';
import {getAllTasks} from '../../helpers/taskServices';

export const handleEnterFace = (navigation, token) => {
  navigation.setOptions({
    headerRight: () => (
      <View style={styles.buttonsContainer}>
        <Button
          source={Icons.language}
          onPress={async () => {
            try {
              showLoader();
              await AsyncStorage.setItem(
                'language',
                Locale.language === 'ar' ? 'en' : 'ar',
              );
              I18nManager.forceRTL(!Locale.isRTL);
              I18nManager.allowRTL(!Locale.isRTL);
              setTimeout(() => {
                RNRestart.restart();
              }, 300);
            } catch (e) {
              Alert.alert(
                Locale.t('common.errorOccurred'),
                Locale.t('myWishesPage.languageErrorChange'),
              );
            }
          }}
        />
        {token ? (
          <Button
            source={Icons.logOut}
            onPress={async () => {
              navigate(pagesNames.popUp, {
                title: 'myWishesPage.logOut',
                confirmButton: async () => {
                  await storeToken('');
                  RNRestart.restart();
                },
              });
            }}
          />
        ) : (
          <Button
            source={Icons.cloud}
            onPress={() => {
              navigate(pagesNames.login);
            }}
          />
        )}
      </View>
    ),
  });
};

export const deleteSpecificDocument = async (userId, item, refreshing) => {
  try {
    showLoader();
    const {_id, data} = item;
    const {mainTask, favorite} = data;
    await deleteDocument(userId, _id);
    if (mainTask?.calendarId) {
      await RNCalendarEvents.removeEvent(mainTask.calendarId);
    }
    showToast('myWishesPage.TaskDeletedSuccessfully');
    if (favorite) setSharedData();
    refreshing();
  } catch (e) {
    handleAPIErrors(e);
  } finally {
    hideLoader();
  }
};

export const getUserData = async () => {
  try {
    showLoader({isLoadingSkeleton: true});
    const result = await getAllTasks();

    store.dispatch(setUserData(result?.data));
  } catch (e) {
    handleAPIErrors(e);
  } finally {
    hideLoader();
  }
};
