import {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert, I18nManager} from 'react-native';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList/EmptyList';
import {Images} from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Locale from '../../helpers/localization';
import RNRestart from 'react-native-restart';
import {pagesNames} from '../../helpers/utils';
import Skeleton from '../../Components/Skeleton/Skeleton';
import {useSelector} from 'react-redux';

export const Dashboard = ({navigation}) => {
  const {userId} = useSelector(state => state.main);
  const {isLoading} = useState(false);
  useEffect(() => {
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
  }, [userId]);

  return (
    <View style={styles.takingAllPage}>
      {!isLoading ? (
        <>
          {/* <FlatList /> */}
          <EmptyList
            image={Images.emptyListPic}
            title={'myWishesPage.emptyFormTitle'}
            description={'myWishesPage.emptyFormTDescription'}
          />
          <Button
            containerStyle={styles.button}
            source={Icons.plus}
            onPress={() => {
              if (userId) navigation.push(pagesNames.createNewTask);
              else navigation.push(pagesNames.login);
            }}
          />
        </>
      ) : (
        <Skeleton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  takingAllPage: {flex: 1},
  button: {
    width: 64,
    height: 64,
    alignSelf: 'flex-end',
    backgroundColor: '#32ADE6',
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 24,
  },
  viewContainer: {flexDirection: 'row'},
});

export default Dashboard;
