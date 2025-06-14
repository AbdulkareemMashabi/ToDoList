import React from 'react';
import {Platform, View} from 'react-native';

import styles from './CustomHeaderNavigation.styles';
import Text from '../Text/Text';
import Button from '../Button/Button';
import {Icons} from '../../assets/Icons';
import {goBack, pagesNames} from '../../helpers/utils';
import Locale from '../../helpers/localization';

export const CustomHeaderNavigation = ({title, navigationBarItems}) => {
  const {rightItems, onBackPress, pageTitle} = navigationBarItems || {};
  return (
    <View style={[styles.rootView, Locale.isRTL ? styles.flipRTL : null]}>
      <View style={[styles.flex_1, styles.leftView]}>
        {title !== pagesNames.dashboard ? (
          <Button
            withoutShadow
            flipRTL
            source={Platform.OS === 'ios' ? Icons.backButton : Icons.arrow}
            onPress={onBackPress || goBack}
          />
        ) : null}
      </View>
      <Text
        style={styles.flex_1}
        flipRTL={Locale.isRTL}
        value={pageTitle}
        localeKey={`pagesNames.${
          title.charAt(0).toLowerCase() + title.slice(1)
        }`}
        textAlign={'center'}
      />

      <View
        style={[
          Locale.isRTL ? styles.flipRTL : null,
          styles.flex_1,
          styles.rightView,
        ]}>
        {rightItems}
      </View>
    </View>
  );
};
