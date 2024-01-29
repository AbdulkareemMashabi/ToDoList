import {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Button from '../../Components/Button/Button';
import {Icons} from '../../assets/Icons';
import EmptyList from '../../Components/EmptyList/EmptyList';
import {Images} from '../../assets/Images';
import {pagesNames} from '../../helpers/utils';
import Skeleton from '../../Components/Skeleton/Skeleton';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSpecificDocument, handleEnterFace} from './utils';
import styles from './Dashboard.styles';
import Task from '../../Components/Task/Task';
import {getShadow} from '../../helpers/shadow';
import Swipeable from '../../Components/Swipeable/Swipeable';

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
        <>
          <FlatList
            ListHeaderComponent={<View style={styles.flatListHeader} />}
            ListFooterComponent={<View style={styles.flatListHeader} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={<View style={styles.separator} />}
            data={userData}
            renderItem={({item, index}) => (
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
                          },
                        });
                      }}
                    />
                  </View>
                )}>
                <Task id={item.id} data={item.data} userId={userId} />
              </Swipeable>
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
        </>,
      );
    else
      returnedJsx.push(
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
              else navigation.push(pagesNames.login);
            }}
          />
        </>,
      );

    return returnedJsx;
  };

  return <View style={styles.container}>{getJsx()}</View>;
};

export default Dashboard;
