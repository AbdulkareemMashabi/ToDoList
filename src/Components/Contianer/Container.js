import {ScrollView, View} from 'react-native';
import styles from './Container.style';
import Skeleton from '../Skeleton/Skeleton';

export const Container = ({
  children,
  noPadding,
  style,
  scrollable,
  isLoading,
  SkeletonPadding,
}) => {
  if (isLoading)
    return (
      <View
        style={[
          styles.container,
          noPadding && !SkeletonPadding ? styles.noPadding : null,
          style,
        ]}>
        <Skeleton />
      </View>
    );

  return scrollable ? (
    <ScrollView
      style={[styles.container, noPadding ? styles.noPadding : null, style]}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[styles.container, noPadding ? styles.noPadding : null, style]}>
      {children}
    </View>
  );
};

export default Container;
