import {useEffect, useState} from 'react';
import {View, FlatList, AppState, RefreshControl} from 'react-native';
import {pagesNames} from '../../helpers/utils';
import {useSelector} from 'react-redux';
import {handleEnterFace} from './utils';
import styles from './Dashboard.styles';
import Task from '../../Components/Task/Task';
import Swipeable from '../../Components/Swipeable/Swipeable';
import {getUserData} from './utils';
import Container from '../../Components/Contianer/Container';
import NetInfo from '@react-native-community/netinfo';
import SwipeableButtons from './DashboardComponents/SwipeableButtons';
import EmptyComponent from './DashboardComponents/EmptyComponent';

export const Dashboard = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {token} = useSelector(state => state.main);
  const {userData} = useSelector(state => state.main);

  useEffect(() => {
    handleEnterFace(navigation, token);
    if (token) refreshing();
    else setLoading(false);
  }, [token]);

  const refreshing = () => {
    getUserData(setLoading, navigation);
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected && AppState.currentState === 'active')
        navigation.navigate(pagesNames.popUp, {
          title: 'myWishesPage.connectionTitle',
          firstButtonTitle: 'myWishesPage.connectionButton',
          withoutCancel: true,
          blueButton: true,
        });
    });
  }, []);

  const getRenderFooter = () => {
    if (userData?.length)
      return {
        source: 'taskDetails.addNewTask',
        onPress: () => {
          navigation.push(pagesNames.createNewTask, {
            refreshing,
          });
        },
      };
    else return null;
  };

  const onPressItem = itemId => {
    navigation.navigate(pagesNames.taskDetailsScreen, {
      documentId: itemId,
      refreshing,
    });
  };

  return (
    <Container isLoading={loading} renderFooter={getRenderFooter()}>
      <FlatList
        contentContainerStyle={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              refreshing();
            }}
            enabled={!!token}
          />
        }
        ListEmptyComponent={
          <EmptyComponent navigation={navigation} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={userData}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <Swipeable
                isSwipeableAtBegin={index === 0 && userData.length === 1}
                renderAction={() => (
                  <SwipeableButtons
                    onPressItem={onPressItem}
                    navigation={navigation}
                    item={item}
                    refreshing={refreshing}
                  />
                )}>
                <Task
                  id={item.id}
                  data={item.data}
                  onPress={() => {
                    onPressItem(item.id);
                  }}
                />
              </Swipeable>
            </View>
          );
        }}
      />
    </Container>
  );
};

export default Dashboard;
