import React from 'react';
import {Platform} from 'react-native';
import Button from '../Components/Button/Button';
import {pagesNames} from '../helpers/utils';
import styles from './App.style';
import {Icons} from '../assets/Icons';

export const getScreenOptions = (navigation, currentPage) => ({
  headerTitleAlign: 'center',
  contentStyle: styles.pageStyle,
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: 'black',
  headerLeft:
    currentPage !== pagesNames.dashboard
      ? () => (
          <Button
            flipRTL={Platform.OS === 'ios'}
            source={Platform.OS === 'ios' ? Icons.backButton : Icons.arrow}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )
      : null,
  headerTitleStyle:
    currentPage === pagesNames.taskDetailsScreen ? styles.title : null,
});
