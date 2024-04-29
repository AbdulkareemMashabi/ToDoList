import {useEffect} from 'react';
import {View, FlatList, AppState} from 'react-native';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList/EmptyList';
import {Images} from '../../assets/Images';
import {pagesNames} from '../../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSpecificDocument, handleEnterFace} from './utils';
import styles from './Dashboard.styles';
import Task from '../../Components/Task/Task';
import {cardShadow} from '../../helpers/shadow';
import Swipeable from '../../Components/Swipeable/Swipeable';
import {getUserData} from '../../App/utils';
import Container from '../../Components/Contianer/Container';
import NetInfo from '@react-native-community/netinfo';

export const Dashboard = ({navigation}) => {
  const {userId} = useSelector(state => state.main);
  const {isLoading, userData} = useSelector(state => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    handleEnterFace(navigation, userId);
  }, [userId]);

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

  const getJsx = () => {
    if (userData.length > 0)
      return (
        <>
          <FlatList
            refreshing={isLoading}
            onRefresh={() => {
              getUserData(userId, dispatch);
            }}
            ListHeaderComponent={<View style={styles.flatListHeader} />}
            ListFooterComponent={<View style={styles.flatListHeader} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={<View style={styles.separator} />}
            data={userData}
            renderItem={({item, index}) => {
              const onPress = () => {
                navigation.navigate(pagesNames.taskDetailsScreen, {
                  documentId: item.id,
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
                              description:
                                'myWishesPage.deletePopUpDescription',
                              confirmButton: dismissPopUp => {
                                deleteSpecificDocument(
                                  userId,
                                  item.id,
                                  dispatch,
                                  dismissPopUp,
                                );
                              },
                            });
                          }}
                        />
                      </View>
                    )}>
                    <Task
                      id={item.id}
                      data={item.data}
                      userId={userId}
                      onPress={onPress}
                    />
                  </Swipeable>
                </View>
              );
            }}
          />
          <View style={[styles.viewButton, cardShadow]}>
            <Button
              source={'taskDetails.addNewTask'}
              onPress={() => {
                navigation.push(pagesNames.createNewTask);
              }}
            />
          </View>
        </>
      );
    else
      return (
        <>
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
              else
                navigation.push(pagesNames.login, {
                  routing: () => {
                    navigation.goBack();
                    navigation.push(pagesNames.createNewTask);
                  },
                });
            }}
          />
        </>
      );
  };

  return (
    <Container isLoading={isLoading} noPadding SkeletonPadding>
      {getJsx()}
    </Container>
  );
};

export default Dashboard;
