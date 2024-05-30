import React, {useEffect, useRef} from 'react';
import {default as RNActionSheet} from 'react-native-actions-sheet';
import {Keyboard} from 'react-native';
import styles from './ActionsSheet.style';

const ActionsSheet = ({children, visible, onClose}) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    if (visible) actionSheetRef.current?.show();
    else actionSheetRef.current?.hide();
  }, [visible]);

  return (
    <RNActionSheet
      gestureEnabled
      ref={actionSheetRef}
      onClose={() => {
        onClose();
        Keyboard.dismiss();
      }}
      containerStyle={styles.container}>
      {children}
    </RNActionSheet>
  );
};

export default ActionsSheet;
