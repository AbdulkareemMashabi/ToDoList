import {Alert, I18nManager, View} from 'react-native';
import Locale from '../../helpers/localization';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import styles from './Dashboard.styles';
import {deleteDocument, getAllDocuments} from '../../helpers/firebase';
import {
  setIsLoadingOverLay,
  setUserData,
} from '../../helpers/Redux/mainReducer';
import {store} from '../../helpers/Redux/store';
import RNCalendarEvents from 'react-native-calendar-events';

export const handleEnterFace = (navigation, userId) => {
  navigation.setOptions({
    headerTitle: Locale.t('myWishesPage.myWishes'),
    headerRight: () => (
      <View style={styles.buttonsContainer}>
        <Button
          source={Icons.language}
          onPress={async () => {
            try {
              store.dispatch(setIsLoadingOverLay(true));
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
        {userId ? (
          <Button
            source={Icons.logOut}
            onPress={async () => {
              navigation.navigate(pagesNames.popUp, {
                title: 'myWishesPage.logOut',
                confirmButton: async () => {
                  await AsyncStorage.setItem('userId', '');
                  RNRestart.restart();
                },
              });
            }}
          />
        ) : (
          <Button
            source={Icons.cloud}
            onPress={() => {
              navigation.push(pagesNames.login);
            }}
          />
        )}
      </View>
    ),
  });
};

export const deleteSpecificDocument = async (
  userId,
  item,
  closePopUp,
  refreshing,
) => {
  try {
    store.dispatch(setIsLoadingOverLay(true));
    const {id, data} = item;
    const {mainTask} = data;
    await deleteDocument(userId, id);
    store.dispatch(setIsLoadingOverLay(false));
    if (mainTask?.calendarId) {
      await RNCalendarEvents.removeEvent(mainTask.calendarId);
    }
    showToast('myWishesPage.TaskDeletedSuccessfully');
    refreshing();
  } catch (e) {
    handleAPIErrors(e);
    store.dispatch(setIsLoadingOverLay(false));
  } finally {
    closePopUp?.();
  }
};

export const getUserData = async (userId, setLoading) => {
  try {
    setLoading(true);
    const documents = await getAllDocuments(userId);
    const reShapeDocuments = [];
    documents.forEach(doc => {
      reShapeDocuments.push({id: doc.id, data: doc.data()});
    });
    store.dispatch(setUserData(reShapeDocuments));
  } catch (e) {
    handleAPIErrors(e);
  } finally {
    setLoading(false);
  }
};
