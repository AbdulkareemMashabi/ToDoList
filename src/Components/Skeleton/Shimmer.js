import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Animated, StyleSheet, View} from 'react-native';
import Locale from '../../helpers/localization';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#F4F6F9',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  biggerShimmer: {
    width: 144,
    height: 18,
    borderRadius: 4,
  },
  smallShimmer: {
    width: 95,
    height: 14,
    borderRadius: 4,
  },
});

export default Shimmer;
