import {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList/EmptyList';
import {Images} from '../../assets/Images';
import {pagesNames, showToast} from '../../helpers/utils';
import Skeleton from '../../Components/Skeleton/Skeleton';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSpecificDocument, handleEnterFace} from './utils';
import styles from './Dashboard.styles';
import Task from '../../Components/Task/Task';
import {getShadow} from '../../helpers/shadow';
import Swipeable from '../../Components/Swipeable/Swipeable';
import {getUserData} from '../../App/utils';
import Container from '../../Components/Contianer/Container';

export const Dashboard = ({navigation}) => {
  const {userId} = useSelector(state => state.main);
  const {isLoading, userData} = useSelector(state => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    handleEnterFace(navigation, userId);
  }, [userId]);

  const getJsx = () => {
    if (isLoading)
      return (
        <View style={[styles.container, styles.skeleton]}>
          <Skeleton />
        </View>
      );
    let returnedJsx = [];
    if (userData.length > 0)
      returnedJsx.push(
        <View key={0} style={styles.container}>
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
            renderItem={({item, index}) => (
              <View key={index}>
                <Swipeable
                  isSwipeableAtBegin={index === 0}
                  renderAction={() => (
                    <View style={styles.buttonsTaskContainer}>
                      <Button
                        containerStyle={[styles.button, styles.infoButton]}
                        source={Icons.info}
                        withoutShadow
                        onPress={() => {
                          navigation.navigate(pagesNames.taskDetailsScreen, {
                            documentId: item.id,
                          });
                        }}
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
                                item.id,
                                dispatch,
                                dismissPopUp,
                              );
                              showToast('myWishesPage.TaskDeletedSuccessfully');
                            },
                          });
                        }}
                      />
                    </View>
                  )}>
                  <Task id={item.id} data={item.data} userId={userId} />
                </Swipeable>
              </View>
            )}
          />
          <View style={[styles.viewButton, getShadow('white')]}>
            <Button
              source={'taskDetails.addNewTask'}
              onPress={() => {
                navigation.push(pagesNames.createNewTask);
              }}
            />
          </View>
        </View>,
      );
    else
      returnedJsx.push(
        <View key={1} style={styles.container}>
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
        </View>,
      );

    return returnedJsx;
  };

  return <Container noPadding>{getJsx()}</Container>;
};

export default Dashboard;
