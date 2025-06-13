import React from 'react';
import {Platform} from 'react-native';
import Button from '../Components/Button/Button';
import {goBack, pagesNames} from '../helpers/utils';
import styles from './App.style';
import {Icons} from '../assets/Icons';

export const getScreenOptions = currentPage => ({
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
              goBack();
            }}
          />
        )
      : null,
  headerTitleStyle:
    currentPage === pagesNames.taskDetailsScreen ? styles.title : null,
});
