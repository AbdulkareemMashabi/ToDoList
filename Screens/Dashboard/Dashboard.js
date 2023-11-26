import {useEffect} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import Button from '../../Components/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList';
import {Images} from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Locale from '../../helpers/localization';
import RNRestart from 'react-native-restart';

export const Dashboard = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonsContainer}>
          <Button
            source={Icons.language}
            onPress={async () => {
              try {
                await AsyncStorage.setItem(
                  'language',
                  Locale.language === 'ar' ? 'en' : 'ar',
                );
                RNRestart.restart();
              } catch (e) {
                Alert.alert(
                  Locale.t('common.errorOccurred'),
                  Locale.t('myWishesPage.languageErrorChange'),
                );
              }
            }}
          />
          <Button
            source={Icons.cloud}
            onPress={() => {
              navigation.push('Login');
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.takingAllPage}>
      {/* <FlatList /> */}
      <EmptyList
        image={Images.emptyListPic}
        title={'myWishesPage.emptyFormTitle'}
        description={'myWishesPage.emptyFormTDescription'}
      />
      <Button containerStyle={styles.button} source={Icons.plus} />
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
    width: '70%',
  },
});

export default Dashboard;
