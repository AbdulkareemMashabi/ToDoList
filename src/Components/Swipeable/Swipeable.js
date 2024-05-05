import React, {useRef, useEffect} from 'react';
import {default as RNSwipeable} from 'react-native-gesture-handler/Swipeable';
import Locale from '../../helpers/localization';

const Swipeable = ({isSwipeableAtBegin, children, renderAction}) => {
  const ref = useRef(null);

  const swipeAtBegin = () => {
    setTimeout(() => {
      Locale.isRTL ? ref.current?.openLeft() : ref.current?.openRight();
    }, 300);
    setTimeout(() => {
      ref.current?.close();
    }, 800);
  };

  useEffect(() => {
    if (isSwipeableAtBegin) swipeAtBegin();
  }, [isSwipeableAtBegin]);

  return (
    <RNSwipeable
      ref={ref}
      renderRightActions={!Locale.isRTL ? renderAction : undefined}
      renderLeftActions={Locale.isRTL ? renderAction : undefined}>
      {children}
    </RNSwipeable>
  );
};

export default Swipeable;
