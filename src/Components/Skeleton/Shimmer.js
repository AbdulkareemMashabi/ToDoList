import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Animated, View} from 'react-native';
import Locale from '../../helpers/localization';

import styles from './Skeleton.style';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Shimmer = () => {
  const firstLineRef = React.createRef();
  const secondLineRef = React.createRef();

  React.useEffect(() => {
    const shimmerAnimated = Animated.stagger(400, [
      Animated.parallel([
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
      ]),
    ]);
    Animated.loop(shimmerAnimated).start();
  }, []);

  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        ref={firstLineRef}
        style={styles.biggerShimmer}
        isReversed={Locale.isRTL}
      />
      <ShimmerPlaceholder
        ref={secondLineRef}
        style={styles.smallShimmer}
        isReversed={Locale.isRTL}
      />
    </View>
  );
};

export default Shimmer;
