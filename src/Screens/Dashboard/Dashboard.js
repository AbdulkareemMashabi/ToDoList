import {useCallback, useEffect} from 'react';
import {View, FlatList, AppState, RefreshControl} from 'react-native';
import {navigate, pagesNames} from '../../helpers/utils';
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
import {useFocusEffect} from '@react-navigation/native';

export const Dashboard = ({route}) => {
  const {token, userData, isLoadingSkeleton} = useSelector(state => state.main);

  useFocusEffect(
    useCallback(() => {
      handleEnterFace(route, token);
      if (token) {
        getUserData();
      }
    }, []),
  );

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected && AppState.currentState === 'active')
        navigate(pagesNames.popUp, {
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
          navigate(pagesNames.createNewTask);
        },
      };
    else return null;
  };

  const onPressItem = task => {
    navigate(pagesNames.taskDetailsScreen, {
      task,
    });
  };

  return (
    <Container renderFooter={getRenderFooter()}>
      <FlatList
        scrollEnabled={!!token}
        contentContainerStyle={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSkeleton}
            onRefresh={() => {
              getUserData();
            }}
            enabled={!!token}
          />
        }
        ListEmptyComponent={<EmptyComponent />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={userData}
        renderItem={({item, index}) => {
          return (
            <View key={index}>
              <Swipeable
                isSwipeableAtBegin={index === 0 && userData.length === 1}
                renderAction={() => (
                  <SwipeableButtons onPressItem={onPressItem} item={item} />
                )}>
                <Task
                  item={item}
                  onPress={() => {
                    onPressItem(item);
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
