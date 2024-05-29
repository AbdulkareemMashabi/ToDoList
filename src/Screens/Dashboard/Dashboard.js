import {useEffect, useState} from 'react';
import {View, FlatList, AppState} from 'react-native';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList/EmptyList';
import {Images} from '../../assets/Images';
import {pagesNames} from '../../helpers/utils';
import {useSelector} from 'react-redux';
import {deleteSpecificDocument, handleEnterFace} from './utils';
import styles from './Dashboard.styles';
import Task from '../../Components/Task/Task';
import Swipeable from '../../Components/Swipeable/Swipeable';
import {getUserData} from './utils';
import Container from '../../Components/Contianer/Container';
import NetInfo from '@react-native-community/netinfo';

export const Dashboard = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {userId} = useSelector(state => state.main);
  const {userData} = useSelector(state => state.main);

  useEffect(() => {
    handleEnterFace(navigation, userId);
  }, [userId]);

  useEffect(() => {
    if (userId) refreshing();
    else setLoading(false);
  }, [userId]);

  const refreshing = () => {
    getUserData(setLoading);
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected && AppState.currentState === 'active')
        navigation.navigate(pagesNames.popUp, {
          title: 'myWishesPage.connectionTitle',
          firstButtonTitle: 'myWishesPage.connectionButton',
          withoutCancel: true,
        });
    });
  }, []);

  return (
    <Container
      isLoading={loading}
      renderFooter={
        userData?.length
          ? {
              source: 'taskDetails.addNewTask',
              onPress: () => {
                navigation.push(pagesNames.createNewTask, {
                  refreshing,
                });
              },
            }
          : null
      }>
      <FlatList
        contentContainerStyle={styles.flatList}
        refreshing={loading}
        onRefresh={() => {
          refreshing();
        }}
        ListEmptyComponent={
          <View style={styles.flex_1}>
            <EmptyList
              image={Images.emptyListPic}
              title={'myWishesPage.emptyFormTitle'}
              description={'myWishesPage.emptyFormTDescription'}
            />
            <Button
              containerStyle={[styles.button, styles.plusButton]}
              source={Icons.plus}
              onPress={() => {
                if (userId)
                  navigation.push(pagesNames.createNewTask, {refreshing});
                else
                  navigation.push(pagesNames.login, {
                    routing: () => {
                      navigation.replace(pagesNames.createNewTask, {
                        refreshing,
                      });
                    },
                  });
              }}
            />
          </View>
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={userData}
        renderItem={({item, index}) => {
          const onPress = () => {
            navigation.navigate(pagesNames.taskDetailsScreen, {
              documentId: item.id,
              refreshing,
            });
          };
          return (
            <View key={index}>
              <Swipeable
                isSwipeableAtBegin={index === 0}
                renderAction={() => (
                  <View style={styles.buttonsTaskContainer}>
                    <Button
                      containerStyle={[styles.button, styles.infoButton]}
                      source={Icons.info}
                      withoutShadow
                      onPress={onPress}
                    />
                    <Button
                      containerStyle={[styles.button, styles.deleteButton]}
                      source={Icons.trash}
                      withoutShadow
                      onPress={() => {
                        navigation.navigate(pagesNames.popUp, {
                          title: 'myWishesPage.deletePopUpTitle',
                          description: 'myWishesPage.deletePopUpDescription',
                          confirmButton: dismissPopUp => {
                            deleteSpecificDocument(
                              userId,
                              item,
                              dismissPopUp,
                              refreshing,
                            );
                          },
                        });
                      }}
                    />
                  </View>
                )}>
                <Task id={item.id} data={item.data} onPress={onPress} />
              </Swipeable>
            </View>
          );
        }}
      />
    </Container>
  );
};

export default Dashboard;
