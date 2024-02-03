import {Alert, I18nManager, View} from 'react-native';
import Locale from '../../helpers/localization';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {handleAPIErrors, pagesNames, showToast} from '../../helpers/utils';
import styles from './Dashboard.styles';
import {deleteDocument} from '../../helpers/firebase';
import {setIsLoadingOverLay} from '../../helpers/Redux/mainReducer';

export const handleEnterFace = (navigation, userId) => {
  navigation.setOptions({
    headerTitle: Locale.t('myWishesPage.myWishes'),
    headerRight: () => (
      <View style={styles.viewContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            source={Icons.language}
            onPress={async () => {
              try {
                await AsyncStorage.setItem(
                  'language',
                  Locale.language === 'ar' ? 'en' : 'ar',
                );
                I18nManager.forceRTL(!Locale.isRTL);
                I18nManager.allowRTL(!Locale.isRTL);
                RNRestart.restart();
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
                await AsyncStorage.setItem('userId', '');
                RNRestart.restart();
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
      </View>
    ),
  });
};

export const deleteSpecificDocument = async (
  userId,
  documentId,
  dispatch,
  dismissPopUp,
) => {
  try {
    dispatch(setIsLoadingOverLay(true));
    await deleteDocument(userId, documentId);
    dispatch(setIsLoadingOverLay(false));
    showToast('myWishesPage.TaskDeletedSuccessfully');
  } catch (e) {
    handleAPIErrors(e);
    dispatch(setIsLoadingOverLay(false));
  } finally {
    dismissPopUp?.();
  }
};
