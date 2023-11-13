import {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Button from '../../Components/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList';
import {Images} from '../../assets/Images';

export const Dashboard = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          source={Icons.cloud}
          onPress={() => {
            navigation.push('Login');
          }}
        />
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
});

export default Dashboard;
