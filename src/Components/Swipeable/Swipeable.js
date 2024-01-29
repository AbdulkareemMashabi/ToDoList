import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {default as RNSwipeable} from 'react-native-gesture-handler/Swipeable';
import Locale from '../../helpers/localization';

const Swipeable = ({isSwipeableAtBegin, children, renderAction}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);

  const swipeAtBegin = () => {
    setTimeout(() => {
      Locale.isRTL ? ref.current?.openLeft() : ref.current?.openRight();
    }, 500);
    setTimeout(() => {
      ref.current?.close();
    }, 1000);
  };

  useEffect(() => {
    if (isSwipeableAtBegin) swipeAtBegin();
  }, [isSwipeableAtBegin]);

  return (
    <RNSwipeable
      ref={ref}
      renderRightActions={!Locale.isRTL ? renderAction : undefined}
      renderLeftActions={Locale.isRTL ? renderAction : undefined}
      containerStyle={{
        transform: [{translateX: animatedValue}],
        paddingVertical: 8,
      }}>
      {children}
    </RNSwipeable>
  );
};

export default Swipeable;
